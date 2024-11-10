import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';

const Landing = () => {
  return (
    <div className="font-display max-w-screen-lg mx-auto text-center py-20">
      <Navbar />

      {/* Logo Image */}
      <div className="flex justify-center mb-0">
        <img
          src="/resource_images/brown_ep_logo.png"
          alt="Brown EP Logo"
          style={{ width: '400px', height: 'auto' }}
          className="mb-0"
        />
      </div>

      {/* Heading and Subheading */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mt-0 font-display">
          Startup<span className="font-sans text-gray-400 font-light">@</span>Brown
        </h1>
        <p className="text-2xl text-gray-500 mt-4 font-medium">
          A guide to help Brown and RISD students navigate the entrepreneurial resources on College Hill.
        </p>

        {/* Button to Redirect to About Page */}
        <div className="mt-8">
          <Link href="/about">
            <a className="bg-red-600 inline-block font-medium text-xl rounded-lg py-3 px-12 text-white transition-all duration-200 hover:bg-red-500 focus:bg-red-500">
              Let's get started
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
