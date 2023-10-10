import { Link } from 'react-router-dom'; 
import { BsBoxArrowInRight } from 'react-icons/bs' 
import { useState } from 'react';
const hero = require('../assets/IMG_5898.webp')

function Hero() {
  const [showIcon, setShowIcon] = useState(false);

  return (
<div
      className="relative flex flex-col justify-center items-center text-white"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <Link to="/home">
        <img
          src={hero}
          alt="hero img"
          className="cursor-pointer"
        />
        {showIcon && (
          <div className='absolute top-1/2 left-1/2 transition-all duration-400 ease-in-out delay-0 -translate-x-1/2 -translate-y-1/2'>
          <BsBoxArrowInRight className="text-8xl" />
        </div>
        )}
      </Link>
    </div>
  );
}

export default Hero;
