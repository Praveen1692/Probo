import React, { useState } from 'react';
//import { sendOTPEmail, verifyOTP } from '../../Services/emailService';
import  { sendOTPEmail, verifyOTP } from '../../Services/emailServices';
import { useNavigate } from 'react-router-dom';




import { isValidOTP } from '../../Utils/otp';
import toast from 'react-hot-toast';
import { Mail, Lock } from 'lucide-react';

 function Gmail() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const navigate=useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendOTPEmail(email);
      setShowOtpInput(true);
      toast.success('Verification code sent to your email!');
      console.log("mail id is",email);
      
    } catch (error) {
      toast.error('Error sending verification code');
      console.log("error comes");
      
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!isValidOTP(otp)) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsLoading(true);
    
    try {
      const isValid = await verifyOTP(email, otp);
      
      if (isValid) {
        toast.success('Email verified successfully!');
        setShowOtpInput(false);
        // Handle successful verification (e.g., update user state, redirect, etc.)
        navigate('/register');
      } else {
        toast.error('Invalid or expired verification code');
      }
    } catch (error) {
      toast.error('Error verifying code');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Email Verification</h2>
      
      {!showOtpInput ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 pr-4 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="relative">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="pl-10 pr-4 py-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>
          <button
            type="button"
            onClick={() => setShowOtpInput(false)}
            className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Change Email
          </button>
        </form>
      )}
    </div>
  );
}



export default Gmail;