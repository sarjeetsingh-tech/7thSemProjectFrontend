import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userToken = localStorage.getItem('user');
      if (!userToken) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      try {
        const parsedToken = JSON.parse(userToken);
        const id = parsedToken?.userId;
        if (!id) {
          setError('Invalid user data');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing');
          setLoading(false);
          return;
        }

        // Fetch user details
        const userResponse = await fetch(`http://localhost:3000/user/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        if (!userData) {
          setError('No user details found. Please complete your profile.');
          setUser({});
        } else {
          setUser(userData);
        }

        // Fetch registered events
        const eventsResponse = await fetch(`http://localhost:3000/events/registered`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events');
        }

        const eventsData = await eventsResponse.json();
        console.log(eventsData);
        setEvents(eventsData || []);

      } catch (err) {
        setError(err.message);
        setUser({});
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExploreEvents = () => navigate('/events');
  const handleUserDetails = () => navigate('/user-details');
  const handleViewEvent = (eventId) => navigate(`/events/${eventId}`);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString();
  };

  const TabButton = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${active ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  const InfoCard = ({ label, value }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold mt-1">{value || 'Not provided'}</p>
    </div>
  );

  const renderTabContent = () => {
    const { userDetails } = user || {};

    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="Date of Birth" value={formatDate(userDetails?.dateOfBirth)} />
              <InfoCard label="Gender" value={userDetails?.gender} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Interests</h4>
              {userDetails?.interests?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userDetails.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No interests added</p>
              )}
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-4">
            {userDetails?.education?.length > 0 ? (
              userDetails.education.map((edu, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{edu.college || 'College name not provided'}</h3>
                  <p className="text-gray-600">Graduation Year: {edu.passingYear || 'Not provided'}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No education details added</p>
                <button
                  onClick={handleUserDetails}
                  className="mt-2 text-blue-500 hover:text-blue-700 underline"
                >
                  Add Education Details
                </button>
              </div>
            )}
          </div>
        );

      case 'contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Phone" value={userDetails?.contact?.phone} />
            <InfoCard label="Alternate Email" value={userDetails?.contact?.alternateEmail} />
            <InfoCard label="City" value={userDetails?.city} />
            <InfoCard label="State" value={userDetails?.state} />
            <InfoCard label="Pin Code" value={userDetails?.pinCode} />
          </div>
        );

      case 'registeredEvents':
        return (
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-gray-600">Location: {event.location || 'Location not specified'}</p>
                    <p className="text-gray-600">Date: {formatDate(event.dateTime)}</p>
                  </div>
                  <button
                    onClick={() => handleViewEvent(event._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No registered events</p>
                <button
                  onClick={handleExploreEvents}
                  className="mt-2 text-blue-500 hover:text-blue-700 underline"
                >
                  Explore Events
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          {error.includes('profile') && (
            <button
              onClick={handleUserDetails}
              className="mt-2 text-red-700 underline hover:text-red-800"
            >
              Complete Profile
            </button>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{user?.name || 'Name not set'}</h1>
                <p className="text-gray-600">{user?.email || 'Email not available'}</p>
              </div>
              <button
                onClick={handleUserDetails}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
          {user?.role && (
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full ml-4">
              {user.role}
            </span>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <TabButton label="Personal" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
          <TabButton label="Education" active={activeTab === 'education'} onClick={() => setActiveTab('education')} />
          <TabButton label="Contact" active={activeTab === 'contact'} onClick={() => setActiveTab('contact')} />
          <TabButton label="Registered Events" active={activeTab === 'registeredEvents'} onClick={() => setActiveTab('registeredEvents')} />
        </div>
        {renderTabContent()}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleExploreEvents}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 2.988 10 2.988s8.268 2.955 9.542 7.012c-1.274 4.057-5.064 7.012-9.542 7.012S1.732 14.057.458 10zM2 10a8 8 0 1116 0A8 8 0 012 10z" clipRule="evenodd" />
          </svg>
          Explore Events
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;