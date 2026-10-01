from django.urls import path
from .views import PublicEventListView, AdminEventListCreateView, AdminEventDetailView

urlpatterns = [
    path('', PublicEventListView.as_view(), name='public_events'),
    path('admin/list/', AdminEventListCreateView.as_view(), name='admin_events_list_create'),
    path('admin/<int:pk>/', AdminEventDetailView.as_view(), name='admin_event_detail'),
]
