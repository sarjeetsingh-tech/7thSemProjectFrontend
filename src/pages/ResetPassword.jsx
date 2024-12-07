import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import AuthImage from '../components/AuthImage';
import TextField from '@mui/material/TextField';

export default function ResetPassword() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            // Handle case where token is missing
            console.error('Token is missing from the URL.');
            // Optionally redirect the user or show an error message
        }
    }, [token]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send password reset request to the server
            const response = await fetch('http://localhost:3000/reset-Password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword, confirmNewPassword })
            });

            const data = await response.json();
            setLoading(false);
            setMessage(data.message);
        } catch (error) {
            setLoading(false);
            setMessage('Error resetting password.');
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='mt-16 flex flex-row flex-grow'>
                <div className='w-[45%] flex flex-col ml-40 mt-40'>
                    <div className=''>
                        <p className='font-bold text-3xl text-gray-900 my-2'>Reset Password</p>
                    </div>
                    <form onSubmit={handlePasswordReset}>
                        <div className='mt-4 w-[50%]'>
                            <TextField id="standard-basic"  value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password:" variant="standard" className='w-full mt-4' />
                        </div>
                        <div className='mt-4 w-[50%]'>
                            <TextField id="standard-basic"  value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} label="Confirm New Password:" variant="standard" className='w-full mt-4' />
                        </div>
                        <button type="submit" className='mt-5 text-blue-900' disabled={loading}>Reset Password</button>
                    </form>
                    {loading && <Loader />}
                    {message && <div>{message}</div>}
                </div>
                <AuthImage />
            </div>
            <Footer />
        </div>
    );
}
