import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import './Register.css'
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {

    const [email, setEmail] = useState('');
    const handleEmailOnChange = (event) => {
        // setEmail(event.target.value);
        // console.log(email)
    }
    const [password, setPassword] = useState('');
    const handlePasswordOnBlur = (event) => {
        // setPassword(event.target.value);
        // console.log(event.target.value)
    }
    const [errormsg, setErrormsg] = useState('');
    const [successmsg, setSuccessmsg] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrormsg('')
        // console.log(event.target.email.value)
        // console.log(event.target.password.value)
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;
        if (!/(?=.*?[A-Z])/.test(password)) {
            setErrormsg('Add at least one capital letter');
            return;
        }
        else if (!/(?=.*?[a-z])/.test(password)) {
            setErrormsg('Add at least one small letter');
            return;
        }
        else if (!/(?=.*?[0-9])/.test(password)) {
            setErrormsg('Add at least one digit');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential);
                setSuccessmsg('Registration Successfull');
                setErrormsg('')
                event.target.reset();

                //calling send verification
                sendVerification(userCredential.user)
                updateUserData(userCredential.user, name)
            })
            .catch(error => {
                console.error(error.message)
                setSuccessmsg('')
                setErrormsg(error.message)
            })
    }
    const sendVerification = user =>{
        sendEmailVerification(user)
        .then(result => {
            console.log(result)
            alert('Verify Email')
        })
    }
    const updateUserData = (user, name) =>{
        updateProfile(user,{
            displayName: name
        })
        .then(result =>{
            console.log('Update User Name')
        })
        .catch(error => {
            setErrormsg(error.message)
        })
    }

    return (
        <div className='mt-10'>
            <h2 className='text-center my-2 text-lg font-bold text-red-700'>{errormsg}</h2>
            <h2 className='text-center my-2 text-lg font-bold text-red-700'>{successmsg}</h2>
            <h2 className='text-center my-2 text-lg font-bold text-blue-700'>Regester Here</h2>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit} className='form flex justify-center flex-col items-center gap-5 text-lg p-2' >
                    <input onChange={handleEmailOnChange} type="email" name="email" id="email" placeholder='Your Email' required className='border rounded p-3 w-full'/>

                    <input type="text" name="name" id="name" placeholder='Your Name' required className='border rounded  p-3 w-full' />

                    <input onBlur={handlePasswordOnBlur} type="password" name="password" id="password" placeholder='Your password' required className='border rounded p-3 w-full' />

                    <input type="submit" value="Register" className='border w-[25%] p-3 bg-blue-600 hover:bg-amber-500 px-2 py-1 rounded text-white' />
                    <button className='text-blue-700 underline hover:text-amber-800'><Link to='/login'>Login</Link></button>
                </form>
            </div>
        </div>
    );
};

export default Register;