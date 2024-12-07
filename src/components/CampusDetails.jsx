import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { FcNext, FcPrevious } from "react-icons/fc";
import SloganRotator from './SloganRotator';
import { useNavigate } from 'react-router-dom';

function CampusDetails() {
  const [activeSection, setActiveSection] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  const campusSlogans = [
    "Building tomorrow's leaders today",
    "Excellence in education, leadership in action",
    "Where knowledge meets opportunity",
    "Shaping futures, creating possibilities",
    "Innovation starts here"
  ];

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    website: '',
    contact: { phone: '', email: '' },
    description: '',
    facilities: [],
    programsOffered: [],
    pinCode: '',
  });

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/campus/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        navigate('/campus-dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const progressPercent = ((activeSection + 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 pt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {!isSmallScreen && (
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-12 flex items-center justify-center">
                <SloganRotator slogans={campusSlogans} />
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

              {/* Basic Information */}
              <div className={activeSection === 0 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
                  <p className="text-gray-600">Tell us about your institution</p>
                </div>
                <TextField
                  label="Campus Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <TextField
                  label="Website"
                  variant="outlined"
                  fullWidth
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div className={activeSection === 1 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Location Details</h2>
                  <p className="text-gray-600">Where are you located?</p>
                </div>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
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
                    label="Pincode"
                    variant="outlined"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className={activeSection === 2 ? 'space-y-6' : 'hidden'}>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                  <p className="text-gray-600">How can students reach you?</p>
                </div>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                />
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

export default CampusDetails;
