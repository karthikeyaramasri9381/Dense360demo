from django.db import models
from django.conf import settings
from students.models import Student
import datetime

def generate_unique_registration_code():
    year = datetime.datetime.now().year
    prefix = f"D360-{year}-"
    # Find the latest registration for this year
    last_reg = Registration.objects.filter(registration_code__startswith=prefix).order_by('-id').first()
    if last_reg and last_reg.registration_code:
        try:
            last_seq = int(last_reg.registration_code.split('-')[-1])
            new_seq = last_seq + 1
        except (ValueError, IndexError):
            new_seq = Registration.objects.count() + 1
    else:
        new_seq = Registration.objects.count() + 1
    
    code = f"{prefix}{str(new_seq).zfill(6)}"
    while Registration.objects.filter(registration_code=code).exists():
        new_seq += 1
        code = f"{prefix}{str(new_seq).zfill(6)}"
    return code

class Registration(models.Model):
    STATUS_CHOICES = (
        ('PENDING', 'Pending Review'),
        ('CONFIRMED', 'Confirmed'),
        ('REJECTED', 'Rejected'),
        ('CANCELLED', 'Cancelled'),
    )

    registration_code = models.CharField(
        max_length=50, 
        unique=True, 
        db_index=True, 
        editable=False,
        help_text="Unique Registration Identifier e.g. D360-2026-000001"
    )
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='registration')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING', db_index=True)
    consent_given = models.BooleanField(default=True, help_text="Consent to terms and submission")
    admin_notes = models.TextField(blank=True, null=True, help_text="Internal notes by administrator")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.registration_code:
            self.registration_code = generate_unique_registration_code()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.registration_code} - {self.student.name} ({self.status})"

class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=100)
    target_entity = models.CharField(max_length=100)
    target_id = models.CharField(max_length=100)
    details = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.created_at.strftime('%Y-%m-%d %H:%M')}] {self.action} on {self.target_entity} #{self.target_id}"
