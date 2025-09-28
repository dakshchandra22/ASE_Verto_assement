import { useState, useCallback } from 'react';
import { VALIDATION_RULES } from '../constants';

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value || value.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
          newErrors.name = 'Name must be at least 2 characters long';
        } else if (value.trim().length > VALIDATION_RULES.NAME.MAX_LENGTH) {
          newErrors.name = 'Name must be less than 50 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value || value.trim().length === 0) {
          newErrors.email = 'Email is required';
        } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (!value || value.trim().length === 0) {
          newErrors.phone = 'Phone number is required';
        } else if (!VALIDATION_RULES.PHONE.PATTERN.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [errors]);

  const validateForm = useCallback((formData) => {
    const newErrors = {};

    // Validate name
    if (!formData.name || formData.name.trim().length < VALIDATION_RULES.NAME.MIN_LENGTH) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (formData.name.trim().length > VALIDATION_RULES.NAME.MAX_LENGTH) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Validate email
    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = 'Email is required';
    } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!formData.phone || formData.phone.trim().length === 0) {
      newErrors.phone = 'Phone number is required';
    } else if (!VALIDATION_RULES.PHONE.PATTERN.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors
    };
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
};

