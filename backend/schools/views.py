from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db.models import Count, Q
from students.models import Student
from registrations.serializers import StudentSerializer

class AdminSchoolsReportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        search = request.query_params.get('search', '').strip()
        
        # Aggregate real data from Student model
        qs = Student.objects.all()
        if search:
            qs = qs.filter(Q(school_name__icontains=search) | Q(city__icontains=search))

        schools_summary = (
            qs.values('school_name')
            .annotate(
                total_students=Count('id'),
                total_registrations=Count('registration'),
                confirmed_count=Count('registration', filter=Q(registration__status='CONFIRMED')),
                pending_count=Count('registration', filter=Q(registration__status='PENDING')),
            )
            .order_by('-total_students')
        )

        # Enhance with city information
        result = []
        for s in schools_summary:
            school_name = s['school_name']
            sample_student = Student.objects.filter(school_name=school_name).first()
            result.append({
                'school_name': school_name,
                'city': sample_student.city if sample_student and sample_student.city else 'Not specified',
                'student_count': s['total_students'],
                'registration_count': s['total_registrations'],
                'confirmed_count': s['confirmed_count'],
                'pending_count': s['pending_count']
            })

        return Response({
            'success': True,
            'count': len(result),
            'schools': result
        })

class AdminSchoolStudentsDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        school_name = request.query_params.get('school_name', '').strip()
        if not school_name:
            return Response({'success': False, 'message': 'school_name parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        students = Student.objects.filter(school_name__iexact=school_name).select_related('parent', 'registration')
        serializer = StudentSerializer(students, many=True)
        return Response({
            'success': True,
            'school_name': school_name,
            'students': serializer.data
        })
