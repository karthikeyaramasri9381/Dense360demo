from django.urls import path
from .views import AdminSchoolsReportView, AdminSchoolStudentsDetailView

urlpatterns = [
    path('admin/report/', AdminSchoolsReportView.as_view(), name='admin_schools_report'),
    path('admin/students/', AdminSchoolStudentsDetailView.as_view(), name='admin_school_students'),
]
