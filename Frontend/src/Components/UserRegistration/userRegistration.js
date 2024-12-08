import { useState, useCallback } from 'react';

export function useUserRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    mobile: ''
  });

  const [errors, setErrors] = useState({});

  const validateAge = useCallback((age) => {
    if (isNaN(age)) {
      return 'Please enter a valid age';
    }
    if (age < 18) {
      return 'You must be at least 18 years old';
    }
    if (age > 120) {
      return 'Please enter a valid age';
    }
    return undefined;
  }, []);

  const validateMobile = useCallback((mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      return 'Please enter a valid 10-digit mobile number';
    }
    return undefined;
  }, []);

  const validateFullName = useCallback((name) => {
    if (name.length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return 'Name can only contain letters and spaces';
    }
    return undefined;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    setErrors(prev => ({ ...prev, [name]: undefined }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    // Validate full name
    const fullNameError = validateFullName(formData.fullName);
    if (fullNameError) newErrors.fullName = fullNameError;

    // Validate age
    const ageError = validateAge(parseInt(formData.age));
    if (ageError) newErrors.age = ageError;

    // Validate mobile
    const mobileError = validateMobile(formData.mobile);
    if (mobileError) newErrors.mobile = mobileError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateAge, validateFullName, validateMobile]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  }, [formData, validateForm]);

  const isValid = formData.fullName !== '' && 
                 formData.age !== '' && 
                 formData.mobile !== '' && 
                 Object.keys(errors).length === 0;

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isValid
  };
}
