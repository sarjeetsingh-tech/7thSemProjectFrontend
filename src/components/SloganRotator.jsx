import React, { useState, useEffect } from 'react';

const defaultSlogans = [
  "Where Campus Events Come to Life!",
  "Igniting Campus Spirit, One Event at a Time!",
  "Your Passport to Campus Excitement!",
  "Creating Memories, Building Communities!",
  "Empowering Students, Enriching Campus Life!",
  "Unlock the Pulse of Campus Events!",
  "Experience the Vibrancy of Campus Life!",
  "Fueling Campus Creativity and Collaboration!",
  "Elevating Campus Events to the Next Level!",
  "Connecting Campus Communities Through Events!"
];

const defaultSize = "text-3xl"; // Default size for slogans

const SloganRotator = ({ slogans = defaultSlogans, size = defaultSize }) => {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex(prevIndex => (prevIndex + 1) % slogans.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slogans]);

  return (
    <div className="slogan-container">
      <h2 className={`slogan ${size} font-bold text-gray-800 mb-4`}>
        {slogans.length > 0 ? slogans[currentSloganIndex] : 'Loading...'}
      </h2>
    </div>
  );
};

export default SloganRotator;
