import React from 'react';
import logo from '../assets/HI.png';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white my-2">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} className="w-48 h-auto" alt="Logo" />
        <nav>
          <ul className="flex space-x-6 text-xl font-semibold ">
            <li><a href="#about" className="px-3 py-2 text-blue hover:text-white hover:bg-yellow">About</a></li>
            <li><a href="#development-services" className="px-3 py-2 text-blue hover:text-white hover:bg-yellow ">Development Services</a></li>
            <li><a href="#qa-services" className="px-3 py-2 text-blue hover:text-white hover:bg-yellow">QA Services</a></li>
            <li><a href="#team" className="px-3 py-2 text-blue hover:text-white hover:bg-yellow">Team</a></li>
            <li><a href="#contact-us" className="px-3 py-2 text-blue hover:text-white hover:bg-yellow">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>

  );
};

export default Header;
