import { Link } from 'react-router-dom';
import { BsBoxArrowInRight } from 'react-icons/bs'
import { useState } from 'react';
const photo = require('../assets/profile.webp')
const beets = require('../assets/beets.webp')
const brioche = require('../assets/brioche.jpg')
const handroll = require('../assets/handroll.webp')

function PictureComponent() {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Large Circle for Profile Picture */}
      <div className="relative rounded-full border-4 border-sky-300 overflow-hidden
      3xl:w-80 3xl:h-80
      xs:w-60 xs:h-60 
      2xs:w-80 2xs:h-80 
      3xs:w-60 3xs:h-60">
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
        <div className="border-4 border-sky-200 relative rounded-full overflow-hidden -mt-28
        3xl:w-40 3xl:h-40
        xs:w-30 xs:h-30
        2xs:w-40 2xs:h-40 
        3xs:w-28 3xs:h-28">
          <img
            src={beets}
            alt="beets"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="border-4 border-sky-200 relative rounded-full overflow-hidden -mt-10 -ml-10
        3xl:w-40 3xl:h-40
        xs:w-30 xs:h-30
        2xs:w-40 2xs:h-40 
        3xs:w-28 3xs:h-28 ">
          <img
            src={handroll}
            alt="handroll"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="border-4 border-sky-200 relative rounded-full overflow-hidden -mt-28 
        3xl:w-40 3xl:h-40
        xs:w-30 xs:h-30
        2xs:w-40 2xs:h-40 
        3xs:w-28 3xs:h-28">
          <img
            src={brioche}
            alt="brioche"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default PictureComponent;
