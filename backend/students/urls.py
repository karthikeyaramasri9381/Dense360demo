from django.urls import path
from .views import AdminStudentListView, AdminStudentDetailView

urlpatterns = [
    path('admin/list/', AdminStudentListView.as_view(), name='admin_students_list'),
    path('admin/<int:pk>/', AdminStudentDetailView.as_view(), name='admin_student_detail'),
]
