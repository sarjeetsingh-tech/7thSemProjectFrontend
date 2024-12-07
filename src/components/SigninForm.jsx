import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Loader from './Loader';
import SloganRotator from './SloganRotator';
import { useNavigate } from 'react-router-dom';


function SigninForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'campus') {
          navigate('/campus-dashboard')
        }
        else {
          window.location.replace(data.redirectUrl);
        }
        toast.success('Sign in successful!');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-12">
        <div className="w-full flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Back!</h1>
          <p className="text-xl text-blue-100">Continue your journey with CampusVibes</p>
          <div className="mt-12">
            <SloganRotator />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <ToastContainer />
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-gray-600">Access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              variant="outlined"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Checkbox size="small" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/reset-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium 
                       hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? <div className='ml-[40%]' ><Loader size="sm" /> </div>: 'Sign In'}
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-500">Don't have an account?</span>
              <Link to="/signup" className="ml-2 text-blue-600 hover:text-blue-800 font-medium">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;