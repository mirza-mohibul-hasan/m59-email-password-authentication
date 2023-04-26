import React, { useRef, useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {

    const [errmsg, setErrmsg] = useState('')
    const [succmsg, setSuccmsg] = useState('')
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setErrmsg('')
                setSuccmsg('Login successfull')
            })
            .catch(error => {
                console.log(error);
                setSuccmsg('')
                setErrmsg('Login failed')
            })
    }
    const handleResetPassword = event => {
        const email = emailRef.current.value;
        console.log("Your Mail", email);
        if (!email) {
            alert('Please enter a email address')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error)
                setErrmsg(error.message)
            })
    }

    return (
        <div>
            <h2 className='text-center my-2 text-lg font-bold text-blue-700'>Login Here</h2>
            <h2 className='text-center my-2 text-lg font-bold text-blue-700'>{succmsg}</h2>
            <h2 className='text-center my-2 text-lg font-bold text-yellow-700'>{errmsg}</h2>
            <div className='flex justify-center flex-col items-center'>
                <form onSubmit={handleLogin} className='form flex justify-center flex-col items-center gap-5 text-lg p-2' >
                    <input ref={emailRef} type="email" name="email" id="email" placeholder='Your Email' required className='border rounded p-3 w-full' />

                    <input type="password" name="password" id="password" placeholder='Your password' required className='border rounded p-3 w-full' />

                    <input type="submit" value="Login" className='border w-[25%] p-3 bg-blue-600 hover:bg-amber-500 px-2 py-1 rounded text-white' />
                    <p className='flex gap-10'>
                        <button onClick={handleResetPassword} className='text-blue-700 underline hover:text-amber-800'>Reset Password</button>
                        <button className='text-blue-700 underline hover:text-amber-800'><Link to='/register'>Register</Link></button>
                    </p>
                </form>

            </div>
        </div>
    );
};

export default Login;