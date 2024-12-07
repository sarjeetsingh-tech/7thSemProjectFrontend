import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="min-h-screen relative">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1469&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
            CampusVibes
          </h1>
          
          <p className="text-xl text-blue-100 leading-relaxed mb-12">
            Connect, Engage, and Discover Amazing Campus Events
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/signup"
              className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          {[
            {
              title: "Discover Events",
              desc: "Find exciting events happening around your campus"
            },
            {
              title: "Connect with Peers",
              desc: "Meet like-minded students and build connections"
            },
            {
              title: "Stay Updated",
              desc: "Never miss important campus activities and events"
            }
          ].map((feature, index) => (
            <div key={index} className="backdrop-blur-md bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-blue-100">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}