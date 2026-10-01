from rest_framework import serializers, generics, permissions
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    activities_count = serializers.IntegerField(source='activities.count', read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'start_time', 'end_time', 'venue', 'status', 'capacity', 'activities_count', 'created_at']

class PublicEventListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EventSerializer
    queryset = Event.objects.filter(status='PUBLISHED').order_by('date', 'start_time')

class AdminEventListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventSerializer
    queryset = Event.objects.all().order_by('-date')

class AdminEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EventSerializer
    queryset = Event.objects.all()
