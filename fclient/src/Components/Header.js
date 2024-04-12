import React from 'react';

const Header = () => {
  return (
    <header className="bg-white text-blue py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Hiptify</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#about" className="p-3 hover:text-white hover:bg-blue">About</a></li>
            <li><a href="#development-services" className=" p-3 hover:text-white hover:bg-blue">Development Services</a></li>
            <li><a href="#qa-services-team" className="p-3 hover:text-white hover:bg-blue">QA Services</a></li>
            <li><a href="#qa-services-team" className="p-3 hover:text-white hover:bg-blue">Team</a></li>
            <li><a href="#contact-us" className="p-3 hover:text-white hover:bg-blue">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
