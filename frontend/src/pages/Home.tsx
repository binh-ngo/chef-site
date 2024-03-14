import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-center">
          <img
            className="w-20 h-20 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
          <p className="text-gray-600">Software Developer</p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            fringilla, nunc nec aliquam tincidunt, mauris lorem tincidunt
            sem, vitae aliquam nunc justo id nunc.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800">Skills</h2>
          <ul className="mt-2 text-gray-600">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

