from django.urls import path
from .views import AttendanceListView, MarkAttendanceView

urlpatterns = [
    path('admin/list/', AttendanceListView.as_view(), name='admin_attendance_list'),
    path('admin/mark/', MarkAttendanceView.as_view(), name='admin_attendance_mark'),
]
