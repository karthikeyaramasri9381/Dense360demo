"""
URL configuration for DENSE360 project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/registrations/', include('registrations.urls')),
    path('api/students/', include('students.urls')),
    path('api/schools/', include('schools.urls')),
    path('api/events/', include('events.urls')),
    path('api/activities/', include('activities.urls')),
    path('api/attendance/', include('attendance.urls')),
    path('api/certificates/', include('certificates.urls')),
    path('api/reports/', include('reports.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
