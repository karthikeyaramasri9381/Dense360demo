from django.urls import path
from .views import PublicActivityListView, AdminActivityListCreateView, AdminActivityDetailView

urlpatterns = [
    path('', PublicActivityListView.as_view(), name='public_activities'),
    path('admin/list/', AdminActivityListCreateView.as_view(), name='admin_activities_list_create'),
    path('admin/<int:pk>/', AdminActivityDetailView.as_view(), name='admin_activity_detail'),
]
