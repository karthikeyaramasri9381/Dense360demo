from django.db import models
from parents.models import Parent

class Student(models.Model):
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
        ('PREFER_NOT_TO_SAY', 'Prefer not to say'),
    )

    name = models.CharField(max_length=200, db_index=True, help_text="Student's Full Name")
    date_of_birth = models.DateField(blank=True, null=True, help_text="Date of birth")
    gender = models.CharField(max_length=25, choices=GENDER_CHOICES, blank=True, null=True)
    class_name = models.CharField(max_length=50, help_text="Class / Grade, e.g. 10, 11, 12")
    section = models.CharField(max_length=20, blank=True, null=True, help_text="e.g. A, B, C")
    school_name = models.CharField(max_length=255, db_index=True, help_text="Free text school name entered by student")
    city = models.CharField(max_length=100, blank=True, null=True, help_text="City or Location")
    parent = models.ForeignKey(Parent, on_delete=models.CASCADE, related_name='students')
    interests_group = models.CharField(max_length=255, blank=True, null=True, help_text="Free text field, e.g. MPC, BiPC, Robotics, Design")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - Class {self.class_name} ({self.school_name})"
