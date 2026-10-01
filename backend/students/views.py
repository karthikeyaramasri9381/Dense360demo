from rest_framework import generics, permissions
from django.db.models import Q
from .models import Student
from registrations.serializers import StudentSerializer

class AdminStudentListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = StudentSerializer

    def get_queryset(self):
        qs = Student.objects.select_related('parent', 'registration').all()
        search = self.request.query_params.get('search', '').strip()
        if search:
            qs = qs.filter(
                Q(name__icontains=search) |
                Q(school_name__icontains=search) |
                Q(class_name__icontains=search) |
                Q(parent__name__icontains=search) |
                Q(parent__mobile__icontains=search) |
                Q(registration__registration_code__icontains=search)
            )
        class_param = self.request.query_params.get('class', '').strip()
        if class_param and class_param.upper() != 'ALL':
            qs = qs.filter(class_name__iexact=class_param)
        return qs.order_by('-created_at')

class AdminStudentDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Student.objects.select_related('parent', 'registration').all()
    serializer_class = StudentSerializer
