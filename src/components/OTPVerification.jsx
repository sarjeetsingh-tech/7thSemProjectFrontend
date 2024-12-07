import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from 'react-toastify';

function OTPVerification({ email, setShowOTPSection, password, name, role, setError }) {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    const inputs = document.querySelectorAll('#otp > *[id]');
    inputs.forEach((input, index) => {
      input.addEventListener('input', (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
          setOtpValues(prev => {
            const newValues = [...prev];
            newValues[index] = value;
            return newValues;
          });
          if (index < inputs.length - 1 && value) inputs[index + 1].focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  }, []);

  useEffect(() => {
    if (otpValues.every(v => v)) handleSubmit();
  }, [otpValues]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp: otpValues.join(''),
          password,
          name,
          role
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.location.href = data.redirectUrl;
        toast.success(data.message);
      } else {
        window.location.href = '/signup';
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Verification failed');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Verify Your Email</h1>
        <div className="mt-3 text-gray-600">
          <p>Enter the verification code sent to</p>
          <p className="font-medium text-gray-800">{email}</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div id="otp" className="flex gap-2 justify-center mb-8">
          {[0, 1, 2, 3, 4, 5].map(index => (
            <input
              key={index}
              id={`otp${index}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              autoComplete="off"
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => setShowOTPSection(false)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>

          <button
            type="submit"
            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Verify
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default OTPVerification;