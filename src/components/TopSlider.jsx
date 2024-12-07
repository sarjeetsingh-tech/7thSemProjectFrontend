import React, { useState, useEffect } from 'react';

const TopSlider = ({ images, captions, htmlContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const changeSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex" style={{ width: `${images.length * 100}%`, transform: `translateX(-${currentIndex * (100 / images.length)}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-[300px] bg-cover bg-center" style={{ width: `${100 / images.length}%`, backgroundImage: `url(${image})` }}>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-60"></div>
              {captions[index] && (
                <div className="absolute top-4 left-4 text-white z-10">{captions[index]}</div>
              )}
              {htmlContent[index] && (
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
                  {htmlContent[index]}
                  <div></div>
                </div>
              )}
              <button className="absolute top-1/2 -translate-y-1/2 left-4 w-8 h-8 bg-gray-300 rounded-full cursor-pointer z-10" onClick={prevSlide}>&lt;</button>
              <button className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 bg-gray-300 rounded-full cursor-pointer z-10" onClick={nextSlide}>&gt;</button>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => changeSlide(index)}
            className={`w-4 h-[2px] mx-2   cursor-pointer ${index === currentIndex ? 'bg-black' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TopSlider;
