import React from 'react';

import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const Submit = () => {
    // navigate to login page;
    navigate('/login');
   

    
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">TradeX</div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-gray-700 hover:text-gray-900">Markets</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Portfolio</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Wallet</a>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800" onClick={Submit}>
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}