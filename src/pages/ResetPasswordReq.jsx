import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TextField from '@mui/material/TextField';
import AuthImage from '../components/AuthImage';

const ResetPasswordReq = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send email reset request to the server
            const response = await fetch('http://localhost:3000/reset-password-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }) // Ensure email is properly sent in the request body
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error sending reset email.');
            console.error('Error sending reset email:', error);
        }
        setLoading(false);
    };

    const renderEmailForm = () => (
        <form onSubmit={handleEmailSubmit}>
            <p className='font-bold text-3xl text-gray-900 my-2'>Enter registered email</p>
            <div className='mt-4 w-[50%]'>
                <TextField id="standard-basic" value={email} onChange={(e) => setEmail(e.target.value)} label="Email" variant="standard" className='w-full mt-4' />
            </div>
            <button type="submit" className='mt-5 text-blue-900' disabled={loading}>Submit</button>
        </form>
    );

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-grow mt-16 flex-row'>
                <div className='w-[45%] flex flex-col ml-40 mt-40'>
                    {renderEmailForm()}
                    {loading && <div className='mt-3'><Loader /></div>}
                    {message && <div className='mt-3' >{message}</div>}
                </div>
                <AuthImage />
            </div>
            <Footer />
        </div>
    );
};

export default ResetPasswordReq;
