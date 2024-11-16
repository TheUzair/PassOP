import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 h-14">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </div>

        <a
          href="https://github.com/TheUzair"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 ring-white ring-1 transition-all duration-300"
        >
          <img
            className="invert w-6 mr-2"
            src="/icons/github.svg"
            alt="GitHub Login"
          />
          <span className="font-bold">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
