import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex justify-center mt-10'>
            <div className='flex gap-5 text-white'>
                <Link className='bg-blue-600 hover:bg-amber-300 px-2 py-1 rounded' to='/'>Home</Link>
                <Link className='bg-blue-600 hover:bg-amber-300 px-2 py-1 rounded' to='login'>Login</Link>
                <Link className='bg-blue-600 hover:bg-amber-300 px-2 py-1 rounded' to='register'>Register</Link>
            </div>
        </div>
    );
};

export default Header;