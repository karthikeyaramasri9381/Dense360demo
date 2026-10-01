from django.urls import path
from .views import PublicCertificateVerifyView, AdminCertificateListView, AdminCertificateGenerateView

urlpatterns = [
    path('verify/<str:code>/', PublicCertificateVerifyView.as_view(), name='public_certificate_verify'),
    path('admin/list/', AdminCertificateListView.as_view(), name='admin_certificates_list'),
    path('admin/generate/', AdminCertificateGenerateView.as_view(), name='admin_certificates_generate'),
]
