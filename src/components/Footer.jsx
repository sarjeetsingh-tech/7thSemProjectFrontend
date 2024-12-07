import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-200 py-6 mt-2">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-600">About</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">Services</a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-600">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
