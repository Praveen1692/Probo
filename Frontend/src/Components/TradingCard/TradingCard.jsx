import React from 'react';
import { TrendingUp } from 'lucide-react';

export function TradingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Going Global to win against Cochin Hurricanes?</h3>
        <p className="text-sm text-gray-600 mb-4">KCC T20 Challengers A League, 2024-25</p>
        <div className="flex justify-between mb-4">
          <button className="bg-blue-50 text-blue-600 px-6 py-2 rounded-full">
            Yes 50.00
          </button>
          <button className="bg-pink-50 text-pink-600 px-6 py-2 rounded-full">
            No 50.00
          </button>
        </div>
        <p className="text-sm text-blue-600 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Order Book Event. No result, market will be settled on No.
        </p>
      </div>

      {/* Similar cards for other trading items */}
    </div>
  );
}