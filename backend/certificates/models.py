from django.db import models
from registrations.models import Registration
from events.models import Event
import uuid

def generate_certificate_code():
    return f"CERT-D360-{uuid.uuid4().hex[:8].upper()}"

class Certificate(models.Model):
    TYPE_CHOICES = (
        ('PARTICIPATION', 'Participation Certificate'),
        ('ACHIEVEMENT', 'Achievement Certificate'),
        ('RECOGNITION', 'Recognition Certificate'),
    )

    certificate_code = models.CharField(
        max_length=50, 
        unique=True, 
        db_index=True, 
        default=generate_certificate_code
    )
    registration = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name='certificates')
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True, blank=True, related_name='certificates')
    certificate_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='PARTICIPATION')
    title = models.CharField(max_length=255, default="Certificate of Participation")
    activity_name = models.CharField(max_length=255, blank=True, null=True)
    issued_date = models.DateField(auto_now_add=True)
    is_valid = models.BooleanField(default=True)
    verification_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.certificate_code} - {self.registration.student.name}"
