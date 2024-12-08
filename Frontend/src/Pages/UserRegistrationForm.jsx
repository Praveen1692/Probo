import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserRegistrationForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    userId: '', // Added user ID field
    fullName: '',
    dateOfBirth: '',
    mobileNumber: ''
  });

  // State to manage validation and error messages
  const [errors, setErrors] = useState({
    dobError: ''
  });

  // Generate Unique ID Methods
  const generateUniqueId = () => {
    // Method 1: UUID (Universally Unique Identifier)
    const uuidId = uuidv4();

    // Method 2: Timestamp-based ID
    const timestampId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Method 3: Combination of date, name, and random string
    const combinedId = `USER_${formData.fullName.slice(0,3).toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    // Method 4: Simple hash-based ID
    const hashId = generateHashId(formData.fullName, formData.dateOfBirth);

    return uuidId; // You can choose which method to use
  };

  // Custom hash ID generation function
  const generateHashId = (name, dob) => {
    let hash = 0;
    const str = name + dob + Date.now();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return `USER_${Math.abs(hash).toString(36).toUpperCase()}`;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear DOB error when date is modified
    if (name === 'dateOfBirth') {
      setErrors(prevErrors => ({
        ...prevErrors,
        dobError: ''
      }));
    }
  };

  // Validate Date of Birth function
  const validateDateOfBirth = () => {
    // If no date is entered, return false
    if (!formData.dateOfBirth) {
      setErrors(prevErrors => ({
        ...prevErrors,
        dobError: 'Please enter your date of birth'
      }));
      return false;
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(formData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if user is 18+
    if (age < 18) {
      setErrors(prevErrors => ({
        ...prevErrors,
        dobError: 'You must be 18 years or older'
      }));
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Date of Birth first
    const isDobValid = validateDateOfBirth();
    
    // If DOB is valid, proceed with form submission
    if (isDobValid) {
      // Generate unique ID
      const uniqueId = generateUniqueId();
      
      // Update form data with unique ID
      const submissionData = {
        ...formData,
        userId: uniqueId
      };

      // Here you would typically send the data to a backend
      console.log('Form submitted:', submissionData);
      alert(`Registration Successful! Your User ID is: ${uniqueId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">User Registration Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name Input */}
          <div className="mb-4">
            <label 
              htmlFor="fullName" 
              className="block text-gray-700 font-bold mb-2"
            >
              Full Name
            </label>
            <input 
              type="text" 
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required 
            />
          </div>

          {/* Date of Birth Input */}
          <div className="mb-4">
            <label 
              htmlFor="dateOfBirth" 
              className="block text-gray-700 font-bold mb-2"
            >
              Date of Birth
            </label>
            <input 
              type="date" 
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.dobError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
              required 
            />
            {errors.dobError && (
              <p className="text-red-500 text-sm mt-1">{errors.dobError}</p>
            )}
          </div>

          {/* Mobile Number Input */}
          <div className="mb-6">
            <label 
              htmlFor="mobileNumber" 
              className="block text-gray-700 font-bold mb-2"
            >
              Mobile Number
            </label>
            <input 
              type="tel" 
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required 
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;