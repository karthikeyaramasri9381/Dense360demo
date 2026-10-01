from django.db import models
from django.conf import settings
from registrations.models import Registration
from events.models import Event

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('PRESENT', 'Present'),
        ('ABSENT', 'Absent'),
        ('EXCUSED', 'Excused'),
    )

    registration = models.ForeignKey(Registration, on_delete=models.CASCADE, related_name='attendances')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='attendances')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PRESENT')
    marked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    marked_at = models.DateTimeField(auto_now_add=True)
    notes = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        unique_together = ('registration', 'event')
        ordering = ['-marked_at']

    def __str__(self):
        return f"{self.registration.registration_code} - {self.event.title} ({self.status})"
