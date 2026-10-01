from rest_framework import serializers, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from .models import Attendance
from registrations.models import Registration
from events.models import Event

class AttendanceSerializer(serializers.ModelSerializer):
    registration_code = serializers.CharField(source='registration.registration_code', read_only=True)
    student_name = serializers.CharField(source='registration.student.name', read_only=True)
    school_name = serializers.CharField(source='registration.student.school_name', read_only=True)
    class_name = serializers.CharField(source='registration.student.class_name', read_only=True)
    event_title = serializers.CharField(source='event.title', read_only=True)
    marked_by_name = serializers.CharField(source='marked_by.username', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id', 'registration', 'registration_code', 'student_name', 
            'school_name', 'class_name', 'event', 'event_title', 
            'status', 'marked_by_name', 'marked_at', 'notes'
        ]

class MarkAttendanceView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        registration_code = request.data.get('registration_code', '').strip()
        event_id = request.data.get('event_id')
        attendance_status = request.data.get('status', 'PRESENT').upper()
        notes = request.data.get('notes', '')

        if not registration_code or not event_id:
            return Response({'success': False, 'message': 'Both registration_code and event_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            registration = Registration.objects.select_related('student').get(registration_code__iexact=registration_code)
        except Registration.DoesNotExist:
            return Response({'success': False, 'message': f'Registration with code {registration_code} not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'success': False, 'message': 'Event not found.'}, status=status.HTTP_404_NOT_FOUND)

        attendance, created = Attendance.objects.update_or_create(
            registration=registration,
            event=event,
            defaults={
                'status': attendance_status,
                'marked_by': request.user,
                'notes': notes
            }
        )

        return Response({
            'success': True,
            'message': f"Attendance marked as {attendance_status} for {registration.student.name}",
            'data': AttendanceSerializer(attendance).data
        })

class AttendanceListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        event_id = request.query_params.get('event_id')
        search = request.query_params.get('search', '').strip()

        qs = Attendance.objects.select_related('registration', 'registration__student', 'event', 'marked_by').all()
        if event_id:
            qs = qs.filter(event_id=event_id)
        if search:
            qs = qs.filter(
                Q(registration__registration_code__icontains=search) |
                Q(registration__student__name__icontains=search) |
                Q(registration__student__school_name__icontains=search)
            )

        serializer = AttendanceSerializer(qs, many=True)
        return Response({
            'success': True,
            'count': len(serializer.data),
            'attendance': serializer.data
        })
