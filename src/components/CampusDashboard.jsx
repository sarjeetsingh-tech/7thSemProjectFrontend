import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline';

const CampusDashboard = () => {
    const [campusDetails, setCampusDetails] = useState(null);
    const [createdEvents, setCreatedEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    
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

                // Fetch campus details
                const campusResponse = await fetch(`http://localhost:3000/user/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!campusResponse.ok) {
                    throw new Error('Failed to fetch campus data');
                }

                const campusResult = await campusResponse.json();
                if (!campusResult?.campusDetails) {
                    setError('No campus details found. Please complete your profile.');
                    setCampusDetails({});
                } else {
                    setCampusDetails(campusResult.campusDetails);
                }

                // Fetch events
                const eventsResponse = await fetch(`http://localhost:3000/events/created`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!eventsResponse.ok) {
                    throw new Error('Failed to fetch events');
                }

                const eventsResult = await eventsResponse.json();
                setCreatedEvents(eventsResult || []);

            } catch (err) {
                setError(err.message);
                setCampusDetails({});
                setCreatedEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCampusDetails = () => {
        navigate('/campus-details');
    };

    const handleCreateNewEvent = () => {
        navigate('/events/new');
    };

    const handleViewEvent = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const handleEditEvent = (eventId) => {
        navigate(`/events/${eventId}/edit`);
    };

    const handleDeleteEvent = async (eventId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/events/${eventId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                setCreatedEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
            } else {
                setError(data.message || 'Failed to delete event');
            }
        } catch (error) {
            setError('Failed to delete event');
        }
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
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoCard label="Address" value={campusDetails?.address} />
                            <InfoCard label="City" value={campusDetails?.city} />
                            <InfoCard label="State" value={campusDetails?.state} />
                            <InfoCard label="Phone" value={campusDetails?.contact?.phone} />
                            <InfoCard label="Email" value={campusDetails?.contact?.email} />
                        </div>
                    </div>
                );
            case 'facilities':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Facilities</h4>
                        {campusDetails?.facilities?.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {campusDetails.facilities.map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No facilities listed</p>
                        )}
                    </div>
                );
            case 'programs':
                return (
                    <div className="space-y-4">
                        <h4 className="font-semibold mb-2">Programs Offered</h4>
                        {campusDetails?.programsOffered?.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {campusDetails.programsOffered.map((program, index) => (
                                    <li key={index}>{program}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No programs listed</p>
                        )}
                    </div>
                );
            case 'createdEvents':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">Created Events</h4>
                            <button
                                onClick={handleCreateNewEvent}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition-colors duration-200"
                            >
                                Create New Event
                            </button>
                        </div>
                        {createdEvents.length === 0 ? (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No events created yet</p>
                                <p className="text-sm text-gray-400 mt-2">Create your first event to get started</p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {createdEvents.map((event) => (
                                    <li key={event._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                        <div className="flex-1">
                                            <h5 className="font-semibold">{event.title}</h5>
                                            <p className="text-gray-600">{event.description}</p>
                                            <p className="text-sm text-gray-500">
                                                {event.dateTime ? new Date(event.dateTime).toLocaleString() : 'Date not available'}
                                            </p>
                                            <p className="text-sm text-gray-500">Location: {event.location || 'N/A'}</p>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleViewEvent(event._id)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <EyeIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleEditEvent(event._id)}
                                                className="text-yellow-500 hover:text-yellow-700"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(event._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
                            onClick={handleCampusDetails}
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
                            <h1 className="text-2xl font-bold">{campusDetails?.name || 'Campus Name Not Set'}</h1>
                            <button
                                onClick={handleCampusDetails}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Edit Profile
                            </button>
                        </div>
                        <p className="text-gray-600 mt-2">{campusDetails?.description || 'No description available'}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex space-x-4 mb-6 overflow-x-auto">
                    <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                    <TabButton label="Facilities" active={activeTab === 'facilities'} onClick={() => setActiveTab('facilities')} />
                    <TabButton label="Programs" active={activeTab === 'programs'} onClick={() => setActiveTab('programs')} />
                    <TabButton label="Created Events" active={activeTab === 'createdEvents'} onClick={() => setActiveTab('createdEvents')} />
                </div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default CampusDashboard;