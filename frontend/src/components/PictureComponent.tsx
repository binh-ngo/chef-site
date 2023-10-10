import { Link } from 'react-router-dom';
import { BsBoxArrowInRight } from 'react-icons/bs'
import { useState } from 'react';
const photo = require('../assets/landingphoto.webp')
const beets = require('../assets/beets.webp')
const burger = require('../assets/burger.webp')
const handroll = require('../assets/handroll.webp')

function PictureComponent() {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Large Circle for Profile Picture */}
      <div className="relative w-80 h-80 rounded-full border-4 border-sky-300 overflow-hidden">
        <Link to="/home">
          <img
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
            src={photo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          {showIcon && (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <BsBoxArrowInRight className="text-3xl text-white" />
            </div>
          )}
        </Link>
      </div>

      {/* Smaller Circles for Other Images */}
      <div className="flex mt-4 space-x-2">
        <div className="border-4 border-sky-200 relative w-40 h-40 rounded-full overflow-hidden -mt-28">
          <img
            src={beets}
            alt="beets"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="border-4 border-sky-200 relative w-40 h-40 rounded-full overflow-hidden -mt-10 -ml-10">
          <img
            src={handroll}
            alt="handroll"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="border-4 border-sky-200 relative w-40 h-40 rounded-full overflow-hidden -mt-28">
          <img
            src={burger}
            alt="burger"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default PictureComponent;
