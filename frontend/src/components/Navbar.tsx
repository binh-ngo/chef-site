import React from 'react';
import { FaHome } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { PiBowlFood } from "react-icons/pi";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <ul className='flex flex-row justify-between w-6/12 text-white text-3xl font-extrabold'>
                <li className='mx-4 hover:text-sky-300 hover:scale-150 transition-all duration-300 ease-in-out'><a href='/events'><FaHome /></a></li>
                <li className='mx-4 hover:text-sky-300 hover:scale-150 transition-all duration-300 ease-in-out'><a href='/recipes'><PiBowlFood /></a></li>
                <li className='mx-4 hover:text-sky-300 hover:scale-150 transition-all duration-300 ease-in-out'><a href='/contact'><IoIosContact /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;