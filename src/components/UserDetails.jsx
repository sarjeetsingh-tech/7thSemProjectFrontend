import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { FcNext, FcPrevious } from "react-icons/fc";
import SloganRotator from './SloganRotator';

function UserDetails() {
  const [activeSection, setActiveSection] = useState(0);
  const [sloganIndex, setSloganIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    dateOfBirth: '',
    gender: '',
    interests: [],
    education: { campus: '', passingYear: '' },
    contact: { phone: '', alternateEmail: '' },
    pinCode: ''
  });

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) window.location.href = data.redirectURL;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    setFormData(prev => 
      child ? { ...prev, [parent]: { ...prev[parent], [child]: value } }
           : { ...prev, [name]: value }
    );
  };

  const progressPercent = ((activeSection + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 pt-36">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {!isSmallScreen && (
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-12 flex items-center justify-center">
                <SloganRotator index={sloganIndex} />
              </div>
            )}

            <div className="p-8 space-y-6">
              <div className="mb-8">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className={activeSection === 0 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                  <p className="text-gray-600">Help us personalize your experience</p>
                </div>
                <TextField 
                  label="Full Name" 
                  variant="outlined" 
                  fullWidth 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                  <TextField 
                    label="Gender"
                    variant="outlined"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                  <TextField 
                    label="Birth Year"
                    variant="outlined"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <TextField 
                    label="City"
                    variant="outlined"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <TextField 
                    label="State"
                    variant="outlined"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <TextField 
                    label="Pin Code"
                    variant="outlined"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Education */}
              <div className={activeSection === 1 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                  <p className="text-gray-600">Tell us about your academic background</p>
                </div>
                <TextField 
                  label="College/University"
                  variant="outlined"
                  fullWidth
                  name="education.campus"
                  value={formData.education.campus}
                  onChange={handleChange}
                />
                <TextField 
                  label="Passing Year"
                  variant="outlined"
                  fullWidth
                  name="education.passingYear"
                  value={formData.education.passingYear}
                  onChange={handleChange}
                />
              </div>

              {/* Contact */}
              <div className={activeSection === 2 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
                  <p className="text-gray-600">How can we reach you?</p>
                </div>
                <TextField 
                  label="Alternative Email"
                  variant="outlined"
                  fullWidth
                  name="contact.alternateEmail"
                  value={formData.contact.alternateEmail}
                  onChange={handleChange}
                />
                <TextField 
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                />
                <div className="flex items-center space-x-2 mt-8">
                  <Checkbox />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                {activeSection > 0 && (
                  <button 
                    onClick={() => setActiveSection(prev => prev - 1)}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <FcPrevious className="mr-2" />
                    Previous
                  </button>
                )}
                <button 
                  onClick={() => activeSection === 2 ? handleSubmit() : setActiveSection(prev => prev + 1)}
                  className="flex items-center ml-auto bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {activeSection === 2 ? 'Submit' : 'Next'}
                  {activeSection !== 2 && <FcNext className="ml-2" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;