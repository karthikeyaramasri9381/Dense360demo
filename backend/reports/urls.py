from django.urls import path
from .views import AdminReportSummaryView, ExportRegistrationsCSVView

urlpatterns = [
    path('admin/summary/', AdminReportSummaryView.as_view(), name='admin_reports_summary'),
    path('admin/export/csv/', ExportRegistrationsCSVView.as_view(), name='admin_export_registrations_csv'),
]
