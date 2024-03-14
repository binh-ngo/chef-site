import React from 'react';
const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <ul className='flex flex-row justify-between w-6/12 text-white text-3xl font-extrabold'>
                <li className='mx-4 hover:text-sky-300'><a href='/events'>Events</a></li>
                <li className='mx-4 hover:text-sky-300'><a href='/recipes'>Recipes</a></li>
                <li className='mx-4 hover:text-sky-300'><a href='/contact'>Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;