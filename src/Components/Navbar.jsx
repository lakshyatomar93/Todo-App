import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-screen h-10 flex bg-gray-600 justify-between' >
        <div className="logo">
            <h1 className='font-bold text-xl p-2'>iTask</h1>
        </div>
      <ul className='flex justify-between items-center gap-10 p-3 cursor-pointer '>
        <li className='hover:font-bold w-15'>Home</li>
        <li className='hover:font-bold w-15'>About</li>
        <li className='hover:font-bold w-15'>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar
