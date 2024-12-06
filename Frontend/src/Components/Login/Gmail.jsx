import React, { useState } from 'react';
import { auth } from '../../Config/FirebaseConfig';
import { sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const actionCodeSettings = {
  url: window.location.origin,
  handleCodeInApp: true,
};

function Gmail() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // Store the email in localStorage for later use
      window.localStorage.setItem('emailForSignIn', email);

      // Send verification email
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      setShowOtpInput(true);
      console.log("Code sent");
      
      toast.success('Verification code sent to your email!');
    } catch (error) {
      toast.error('Error sending verification code');
      console.error(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        throw new Error('Email not found');
      }

      // Sign in with email link
      await signInWithEmailLink(auth, email, window.location.href);

      // Clear email from storage
      window.localStorage.removeItem('emailForSignIn');

      toast.success('Email verified successfully!');
      setShowOtpInput(false);
    } catch (error) {
      toast.error('Invalid verification code');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Email Verification</h2>

      {!showOtpInput ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Verification Code
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter Verification Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Verify Code
          </button>
        </form>
      )}

      <Toaster />
    </div>
  );
}

export default Gmail;
