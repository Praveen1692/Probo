import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink 
} from 'firebase/auth';
import { AlertCircle, CheckCircle2, Mail } from 'lucide-react';
import firebaseConfig from '../../Config/FirebaseConfig';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Gmail = () => {

console.log(firebaseConfig);
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (inputEmail && emailRegex.test(inputEmail)) {
      setIsValidEmail(true);
      setError('');
    } else {
      setIsValidEmail(false);
      setError('Please enter a valid email address');
    }
  };

  const sendVerificationEmail = async () => {
    if (!email || !isValidEmail) {
      setError('Please enter a valid email address');
      return;
    }
  
    try {
      const actionCodeSettings = {
        url: window.location.origin, // Use current origin dynamically
        handleCodeInApp: true,
      };
  
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      window.localStorage.setItem('emailForSignIn', email);
      setEmailSent(true);
      setError('');
    } catch (error) {
      console.error('Firebase Error Code:', error.code);
      console.error('Firebase Error Message:', error.message);
      console.error('Full Error Object:', error);
      
      setError('Failed to send verification email. Please check your configuration.');
    }
  };





















  // Handle sign-in with email link (typically in a separate component)
  const completeSignIn = async () => {
    try {
      // Check if the link is a sign-in with email link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get email from local storage
        let email = window.localStorage.getItem('emailForSignIn');
        
        if (!email) {
          // Prompt user to provide email if not in local storage
          email = window.prompt('Please provide your email for confirmation');
        }

        // Complete sign-in
        const result = await signInWithEmailLink(auth, email, window.location.href);
        
        // Clear the email from storage
        window.localStorage.removeItem('emailForSignIn');

        // User is signed in
        console.log('Signed in user:', result.user);
        // Redirect or update UI as needed
      }
    } catch (error) {
      console.error('Error completing sign-in:', error);
    }
  };



  



  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email a</h2>
        <p className="text-gray-600 mb-6">
          {emailSent 
            ? "Verification link sent! Check your email." 
            : "Enter your email to receive a verification link"}
        </p>
        
        {!emailSent && (
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 border rounded ${
                  email 
                    ? (isValidEmail 
                        ? 'border-green-500' 
                        : 'border-red-500')
                    : 'border-gray-300'
                }`}
              />
              {email && (
                <div className="absolute right-3 top-3">
                  {isValidEmail ? (
                    <CheckCircle2 color="green" size={20} />
                  ) : (
                    <AlertCircle color="red" size={20} />
                  )}
                </div>
              )}
            </div>
            
            {error && (
              <div className="text-red-500 text-sm flex items-center">
                <AlertCircle className="mr-2" size={16} />
                {error}
              </div>
            )}
            
            <button 
              onClick={sendVerificationEmail}
              disabled={!isValidEmail}
              className={`w-full py-2 px-4 rounded font-bold flex items-center justify-center ${
                isValidEmail 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Mail className="mr-2" size={20} />
              Send Verification Link To 
            </button>
          </div>
        )}

        {emailSent && (
          <div className="text-center">
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">
                A verification link has been sent to {email}. 
                Please check your inbox and click the link to complete sign-in.
              </span>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        )}
        
        <div className="text-center mt-4 text-gray-500 text-sm">
          Secure authentication powered by{' '}
          <span className="text-blue-600 font-semibold">Firebase</span>
        </div>
      </div>
    </div>
  );
};

export default Gmail;