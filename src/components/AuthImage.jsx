import React, { useState, useEffect } from 'react';

function AuthImage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const images = [
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/tkwokqxsgj6rgpso94jo.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/klwjnhtdi8ftizuchzjr.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/ew0ven2w1xaj6ayxs75w.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037786/obanbfiwfurp1wbbp3i6.png'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

      // Reset animation state after the duration of the animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // Duration of animation in milliseconds
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className='flex-1  p-4 mr-8 mt-4 hidden lg:flex -z-50' style={{ flexBasis: '40%' }}>
      <div className='relative w-full overflow-hidden'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`absolute top-0 left-0 w-full rounded-lg ${
              index === currentIndex ? 'opacity-300' : 'opacity-0 -translate-x-full'
            } ${isAnimating ? 'fade-in' : ''}`}
            
          />
        ))}
      </div>
    </div>
  );
}

export default AuthImage;
