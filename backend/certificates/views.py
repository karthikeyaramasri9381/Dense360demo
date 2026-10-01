from rest_framework import serializers, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Certificate
from registrations.models import Registration
from events.models import Event

class CertificateSerializer(serializers.ModelSerializer):
    registration_code = serializers.CharField(source='registration.registration_code', read_only=True)
    student_name = serializers.CharField(source='registration.student.name', read_only=True)
    school_name = serializers.CharField(source='registration.student.school_name', read_only=True)
    class_name = serializers.CharField(source='registration.student.class_name', read_only=True)
    event_title = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = Certificate
        fields = [
            'id', 'certificate_code', 'registration', 'registration_code',
            'student_name', 'school_name', 'class_name', 'event',
            'event_title', 'certificate_type', 'title', 'activity_name',
            'issued_date', 'is_valid', 'verification_count', 'created_at'
        ]

class PublicCertificateVerifyView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, code):
        code = code.strip()
        try:
            cert = Certificate.objects.select_related('registration__student', 'event').get(
                certificate_code__iexact=code,
                is_valid=True
            )
            cert.verification_count += 1
            cert.save(update_fields=['verification_count'])

            return Response({
                'success': True,
                'verified': True,
                'message': 'Certificate Verified Successfully.',
                'data': {
                    'certificate_code': cert.certificate_code,
                    'student_name': cert.registration.student.name,
                    'school_name': cert.registration.student.school_name,
                    'title': cert.title,
                    'activity_name': cert.activity_name or 'DENSE360 Student Experience',
                    'event_title': cert.event.title if cert.event else 'DENSE360 Programme',
                    'issued_date': cert.issued_date,
                    'certificate_type': cert.get_certificate_type_display(),
                }
            })
        except Certificate.DoesNotExist:
            return Response({
                'success': False,
                'verified': False,
                'message': 'No valid certificate found for this identifier.'
            }, status=status.HTTP_404_NOT_FOUND)

class AdminCertificateListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CertificateSerializer
    queryset = Certificate.objects.select_related('registration__student', 'event').order_by('-created_at')

class AdminCertificateGenerateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        registration_code = request.data.get('registration_code', '').strip()
        event_id = request.data.get('event_id')
        cert_type = request.data.get('certificate_type', 'PARTICIPATION')
        title = request.data.get('title', 'Certificate of Participation')
        activity_name = request.data.get('activity_name', 'DENSE360 Experience')

        try:
            registration = Registration.objects.select_related('student').get(registration_code__iexact=registration_code)
        except Registration.DoesNotExist:
            return Response({'success': False, 'message': 'Registration not found.'}, status=status.HTTP_404_NOT_FOUND)

        event = None
        if event_id:
            try:
                event = Event.objects.get(id=event_id)
            except Event.DoesNotExist:
                pass

        cert = Certificate.objects.create(
            registration=registration,
            event=event,
            certificate_type=cert_type,
            title=title,
            activity_name=activity_name
        )

        return Response({
            'success': True,
            'message': 'Certificate generated successfully.',
            'data': CertificateSerializer(cert).data
        }, status=status.HTTP_201_CREATED)
