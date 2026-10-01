from django.db import models

class Parent(models.Model):
    name = models.CharField(max_length=200, help_text="Parent or Guardian full name")
    mobile = models.CharField(max_length=20, db_index=True, help_text="Contact mobile number")
    email = models.EmailField(blank=True, null=True, help_text="Optional parent email")
    relationship = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. Father, Mother, Guardian")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.mobile})"
