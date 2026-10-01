from django.db import models
from events.models import Event

class Activity(models.Model):
    CATEGORY_CHOICES = (
        ('WORKSHOP', 'Student Engagement Activity / Workshop'),
        ('CHALLENGE', 'Learning-Based Challenge'),
        ('COMPETITION', 'Competitions & Challenges'),
        ('CREATIVE', 'Creative Activities'),
        ('TEAM', 'Team-Based Activities'),
        ('PROBLEM_SOLVING', 'Problem-Solving Experience'),
        ('INTERACTIVE', 'Interactive Session'),
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='activities', blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='WORKSHOP')
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    venue = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, default='ACTIVE')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Activities"
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
