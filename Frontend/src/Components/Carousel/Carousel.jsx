import React from 'react';

export function Carousel() {
  return (
    <div className="relative w-full max-w-5xl mx-auto my-6">
      <div className="flex space-x-4 overflow-x-auto py-4">
        <div className="flex-none w-full md:w-1/3 bg-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Double the Power, Double the Fun!</h3>
          <p className="mb-4">Get equal shares on both sides at ₹50 each with Power Trade</p>
          <div className="flex justify-between items-center">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-full">Know More</button>
            <span className="text-xl">₹100</span>
          </div>
        </div>
        
        <div className="flex-none w-full md:w-1/3 bg-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">TRADE KABADDI!</h3>
          <p className="mb-4">Quick Action, Quick Rewards!</p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-full">TRADE NOW</button>
        </div>

        <div className="flex-none w-full md:w-1/3 bg-blue-500 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Join our Telegram channel</h3>
          <p className="mb-4">& get exclusive updates!</p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-full">JOIN NOW</button>
        </div>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
}