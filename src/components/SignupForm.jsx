import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import OTPVerification from './OTPVerification';
import SloganRotator from './SloganRotator';
import Loader from './Loader';


function SignupForm() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message);
      setLoading(false);
      setShowOTP(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 p-12">
        <div className="w-full flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome to Campus Vibes</h1>
          <p className="text-xl text-blue-100">Connect with your campus community and discover amazing events.</p>
          <div className="mt-12">
            <SloganRotator />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {!showOTP ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                <p className="mt-2 text-gray-600">Join our community today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center space-x-4 mb-6">
                  {['student', 'campus'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`
                        flex-1 py-3 rounded-lg transition-all duration-200
                        ${selectedRole === role
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}
                      `}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={selectedRole === 'campus' ? 'Campus Name' : 'Full Name'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white"
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white"
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-white"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 text-center bg-red-50 py-2 rounded-lg">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    w-full py-3 rounded-lg text-white font-medium transition-all
                    ${selectedRole
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'}
                  `}
                >
                  {loading ? <div className='ml-[40%]' ><Loader size="sm" /> </div> : 'Create Account'}
                </button>

                <div className="text-center text-sm">
                  <span className="text-gray-500">Already have an account?</span>
                  <a href="/signin" className="ml-2 text-blue-600 hover:text-blue-800 font-medium">
                    Sign In
                  </a>
                </div>
              </form>
            </>
          ) : (
            <OTPVerification
              email={formData.email}
              name={formData.name}
              password={formData.password}
              setShowOTPSection={setShowOTP}
              role={selectedRole}
              setError={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupForm;