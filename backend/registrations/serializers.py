from rest_framework import serializers
from django.db import transaction
import re
from parents.models import Parent
from students.models import Student
from .models import Registration, AuditLog

class ParentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parent
        fields = ['id', 'name', 'mobile', 'email', 'relationship']

class StudentSerializer(serializers.ModelSerializer):
    parent = ParentSerializer(read_only=True)

    class Meta:
        model = Student
        fields = [
            'id', 'name', 'date_of_birth', 'gender', 
            'class_name', 'section', 'school_name', 
            'city', 'interests_group', 'parent', 
            'created_at', 'updated_at'
        ]

class PublicRegistrationCreateSerializer(serializers.Serializer):
    # Section 01: Student Details
    full_name = serializers.CharField(max_length=200, required=True, error_messages={'required': 'Student full name is required.'})
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(max_length=25, required=False, allow_blank=True, allow_null=True)
    class_name = serializers.CharField(max_length=50, required=True, error_messages={'required': 'Class is required.'})
    section = serializers.CharField(max_length=20, required=False, allow_blank=True, allow_null=True)

    # Section 02: School Details
    school_name = serializers.CharField(max_length=255, required=True, error_messages={'required': 'School name is required.'})
    city = serializers.CharField(max_length=100, required=False, allow_blank=True, allow_null=True)

    # Section 03: Parent / Guardian Details
    parent_name = serializers.CharField(max_length=200, required=True, error_messages={'required': 'Parent / Guardian name is required.'})
    mobile = serializers.CharField(max_length=20, required=True, error_messages={'required': 'Parent mobile number is required.'})
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True)
    relationship = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)

    # Section 04: Interests / Group
    interests_group = serializers.CharField(max_length=255, required=False, allow_blank=True, allow_null=True)

    # Consent
    consent = serializers.BooleanField(required=True)

    def validate_full_name(self, value):
        val = value.strip()
        if len(val) < 2:
            raise serializers.ValidationError("Please provide a valid full name with at least 2 characters.")
        return val

    def validate_school_name(self, value):
        val = value.strip()
        if len(val) < 2:
            raise serializers.ValidationError("Please provide a valid school name.")
        return val

    def validate_mobile(self, value):
        cleaned = re.sub(r'[\s\-\(\)\+]', '', value)
        if len(cleaned) < 7 or not cleaned.isdigit():
            raise serializers.ValidationError("Please enter a valid mobile number with at least 7 digits.")
        return value.strip()

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError("You must agree to the DENSE360 terms and consent to submit.")
        return value

    def create(self, validated_data):
        with transaction.atomic():
            # Create or update parent record
            parent = Parent.objects.create(
                name=validated_data['parent_name'].strip(),
                mobile=validated_data['mobile'].strip(),
                email=validated_data.get('email', '').strip() if validated_data.get('email') else None,
                relationship=validated_data.get('relationship', '').strip() if validated_data.get('relationship') else 'Parent'
            )

            # Create student record
            student = Student.objects.create(
                name=validated_data['full_name'].strip(),
                date_of_birth=validated_data.get('date_of_birth'),
                gender=validated_data.get('gender'),
                class_name=validated_data['class_name'].strip(),
                section=validated_data.get('section', '').strip() if validated_data.get('section') else None,
                school_name=validated_data['school_name'].strip(),
                city=validated_data.get('city', '').strip() if validated_data.get('city') else None,
                interests_group=validated_data.get('interests_group', '').strip() if validated_data.get('interests_group') else None,
                parent=parent
            )

            # Create registration with auto-generated code
            registration = Registration.objects.create(
                student=student,
                status='PENDING',
                consent_given=validated_data['consent']
            )

            # Audit log
            AuditLog.objects.create(
                action="REGISTRATION_SUBMITTED",
                target_entity="Registration",
                target_id=str(registration.id),
                details={
                    'code': registration.registration_code,
                    'student': student.name,
                    'school': student.school_name,
                    'mobile': parent.mobile
                }
            )

            return registration

class RegistrationListDetailSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Registration
        fields = [
            'id', 'registration_code', 'student', 
            'status', 'consent_given', 'admin_notes', 
            'created_at', 'updated_at'
        ]

class RegistrationStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['status', 'admin_notes']
