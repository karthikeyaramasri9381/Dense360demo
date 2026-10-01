from django.db import models

class Event(models.Model):
    STATUS_CHOICES = (
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    )

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(help_text="Date of the event")
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    venue = models.CharField(max_length=255, default="Main Auditorium / Online")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PUBLISHED', db_index=True)
    capacity = models.PositiveIntegerField(default=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'start_time']

    def __str__(self):
        return f"{self.title} ({self.date})"
