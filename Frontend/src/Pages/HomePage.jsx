import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { Carousel } from '../Components/Carousel/Carousel'
import { TradingCards } from '../Components/TradingCard/TradingCard'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Navbar />
     <main className="pt-16">
     <Carousel />
     <TradingCards />
    
     </main>
      
  
    </div>
  )
}

export default HomePage