import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SwipeableCardCarousel = ({ events }) => {
  const [startIndex, setStartIndex] = useState(0);
  const cardWidth = 320;
  const containerRef = useRef(null);

  const handleSwipe = (direction) => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const cardsPerPage = Math.floor(containerWidth / cardWidth);
    const newIndex = direction === 'left'
      ? Math.max(0, startIndex - cardsPerPage)
      : Math.min(events.length - cardsPerPage, startIndex + cardsPerPage);
    setStartIndex(newIndex);
  };

  return (
    <div className="relative py-4">
      <button
        onClick={() => handleSwipe('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-hidden px-12 transition-all duration-300 ease-out"
      >
        {events.slice(startIndex, startIndex + 4).map((event, index) => (
          <Link
            to={`/events/${event._id}`}
            key={index}
            className="flex-none w-80 group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img
                    src={event.images.length>0?event.images[0].url:"https://images.unsplash.com/photo-1732971856110-6367a9a25303?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">{event.description}</p>
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => handleSwipe('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default SwipeableCardCarousel;
