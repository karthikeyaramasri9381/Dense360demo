from rest_framework import serializers, generics, permissions
from .models import Activity

class ActivitySerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'event', 'event_title', 'title', 'description', 'category', 'category_display', 'date', 'time', 'venue', 'status', 'created_at']

class PublicActivityListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.filter(status='ACTIVE').order_by('date', 'time')

class AdminActivityListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all().order_by('-date')

class AdminActivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ActivitySerializer
    queryset = Activity.objects.all()
