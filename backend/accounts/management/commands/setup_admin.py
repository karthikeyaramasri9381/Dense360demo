import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates default admin superuser if not exists'

    def handle(self, *args, **options):
        username = os.getenv('ADMIN_USERNAME', 'admin')
        email = os.getenv('ADMIN_EMAIL', 'admin@dense360.org')
        password = os.getenv('ADMIN_PASSWORD', 'admin123456')

        if not User.objects.filter(username=username).exists():
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
                role='ADMIN',
                first_name='DENSE360',
                last_name='Admin'
            )
            self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' created successfully."))
        else:
            user = User.objects.get(username=username)
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' updated."))
