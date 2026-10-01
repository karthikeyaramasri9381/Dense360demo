from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone
from .models import Registration, AuditLog
from students.models import Student
from events.models import Event
from .serializers import (
    PublicRegistrationCreateSerializer, 
    RegistrationListDetailSerializer,
    RegistrationStatusUpdateSerializer
)

class PublicRegistrationCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PublicRegistrationCreateSerializer(data=request.data)
        if serializer.is_valid():
            registration = serializer.save()
            return Response({
                'success': True,
                'message': 'Registration submitted successfully!',
                'registration_id': registration.registration_code,
                'status': registration.status,
                'data': {
                    'id': registration.id,
                    'registration_code': registration.registration_code,
                    'student_name': registration.student.name,
                    'school_name': registration.student.school_name,
                    'class_name': registration.student.class_name,
                    'parent_name': registration.student.parent.name,
                    'parent_mobile': registration.student.parent.mobile,
                    'interests_group': registration.student.interests_group,
                    'created_at': registration.created_at
                }
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Please fix the errors below.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class AdminRegistrationListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RegistrationListDetailSerializer

    def get_queryset(self):
        qs = Registration.objects.select_related('student', 'student__parent').all()
        
        # Search filter
        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(
                Q(registration_code__icontains=search) |
                Q(student__name__icontains=search) |
                Q(student__school_name__icontains=search) |
                Q(student__parent__mobile__icontains=search) |
                Q(student__interests_group__icontains=search)
            )

        # Status filter
        status_param = self.request.query_params.get('status', '').strip()
        if status_param and status_param.upper() != 'ALL':
            qs = qs.filter(status=status_param.upper())

        # Class filter
        class_param = self.request.query_params.get('class', '').strip()
        if class_param and class_param.upper() != 'ALL':
            qs = qs.filter(student__class_name__iexact=class_param)

        return qs.order_by('-created_at')

class AdminRegistrationDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Registration.objects.select_related('student', 'student__parent').all()

    def get_serializer_class(self):
        if self.request.method in ['PATCH', 'PUT']:
            return RegistrationStatusUpdateSerializer
        return RegistrationListDetailSerializer

    def perform_update(self, serializer):
        instance = serializer.save()
        AuditLog.objects.create(
            user=self.request.user,
            action=f"STATUS_UPDATED_TO_{instance.status}",
            target_entity="Registration",
            target_id=str(instance.id),
            details={'status': instance.status, 'notes': instance.admin_notes}
        )

class AdminDashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        total_students = Student.objects.count()
        total_registrations = Registration.objects.count()
        pending_registrations = Registration.objects.filter(status='PENDING').count()
        confirmed_registrations = Registration.objects.filter(status='CONFIRMED').count()
        rejected_registrations = Registration.objects.filter(status='REJECTED').count()
        
        # Distinct schools with actual registered students
        total_schools = Student.objects.values('school_name').distinct().count()
        
        # Total upcoming published events
        upcoming_events = Event.objects.filter(status='PUBLISHED').count()

        # Recent registrations (last 5)
        recent_regs = Registration.objects.select_related('student', 'student__parent').order_by('-created_at')[:6]
        recent_serializer = RegistrationListDetailSerializer(recent_regs, many=True)

        # Group by class breakdown
        class_breakdown = list(
            Student.objects.values('class_name')
            .annotate(count=Count('id'))
            .order_by('-count')[:8]
        )

        # Group by top schools
        top_schools = list(
            Student.objects.values('school_name')
            .annotate(count=Count('id'))
            .order_by('-count')[:5]
        )

        return Response({
            'success': True,
            'stats': {
                'total_students': total_students,
                'total_registrations': total_registrations,
                'pending': pending_registrations,
                'confirmed': confirmed_registrations,
                'rejected': rejected_registrations,
                'schools_count': total_schools,
                'upcoming_events': upcoming_events
            },
            'recent_registrations': recent_serializer.data,
            'class_breakdown': class_breakdown,
            'top_schools': top_schools
        })
