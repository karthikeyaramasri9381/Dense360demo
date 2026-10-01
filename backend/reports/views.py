import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from registrations.models import Registration
from students.models import Student
from django.db.models import Count

class AdminReportSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        by_class = list(Student.objects.values('class_name').annotate(total=Count('id')).order_by('-total'))
        by_school = list(Student.objects.values('school_name').annotate(total=Count('id')).order_by('-total')[:10])
        by_status = list(Registration.objects.values('status').annotate(total=Count('id')).order_by('status'))
        
        return Response({
            'success': True,
            'summary': {
                'by_class': by_class,
                'by_school': by_school,
                'by_status': by_status,
                'total_students': Student.objects.count(),
                'total_registrations': Registration.objects.count()
            }
        })

class ExportRegistrationsCSVView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="dense360_registrations_export.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Registration ID', 'Student Full Name', 'Class', 'Section',
            'Gender', 'Date of Birth', 'School Name', 'City',
            'Parent Name', 'Parent Mobile', 'Parent Email', 'Relationship',
            'Interests / Group', 'Status', 'Registered Date'
        ])

        registrations = Registration.objects.select_related('student', 'student__parent').all().order_by('-created_at')

        for r in registrations:
            s = r.student
            p = s.parent
            writer.writerow([
                r.registration_code,
                s.name,
                s.class_name,
                s.section or '',
                s.gender or '',
                s.date_of_birth or '',
                s.school_name,
                s.city or '',
                p.name,
                p.mobile,
                p.email or '',
                p.relationship or '',
                s.interests_group or '',
                r.status,
                r.created_at.strftime('%Y-%m-%d %H:%M:%S')
            ])

        return response
