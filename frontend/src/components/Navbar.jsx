import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
          <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
          </div>
        
        <button className='text-white bg-green-500 my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1'>
        <a href="http://localhost:3001/auth/github">
          <img className='invert w-10 p-1' src="/icons/github.svg" alt="GitHub Login" />
        </a>
          <span className='font-bold px-2'>Github</span>
        </button>
        </div>
    </nav>

  )
}

export default Navbar
