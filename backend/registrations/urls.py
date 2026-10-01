from django.urls import path
from .views import (
    PublicRegistrationCreateView,
    AdminRegistrationListView,
    AdminRegistrationDetailView,
    AdminDashboardStatsView
)

urlpatterns = [
    # Public
    path('', PublicRegistrationCreateView.as_view(), name='public_register'),

    # Admin
    path('admin/list/', AdminRegistrationListView.as_view(), name='admin_registrations_list'),
    path('admin/<int:pk>/', AdminRegistrationDetailView.as_view(), name='admin_registration_detail'),
    path('admin/dashboard/', AdminDashboardStatsView.as_view(), name='admin_dashboard_stats'),
]
