import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        
        <h2 className="text-2xl font-bold mb-4">Probo</h2>
        <p className="text-gray-600 mb-6">
          Hedge your everyday risks by trading on real-life events
        </p>
        <div className="space-y-4">
          <button className="bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
            Sign in with Google
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded w-full">
            Continue via Phone No (India Only)
          </button>
        </div>
        <div className="text-center mt-4 text-gray-500 text-sm">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          ,{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>{' '}
          & AML Policy.
        </div>
        
      </div>
    </div>
  );
};

export default Login;