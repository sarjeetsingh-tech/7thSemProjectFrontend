import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopSlider from './TopSlider';
import { toast } from 'react-toastify';
import { Calendar, MapPin, Users, Clock, Tag, DollarSign, Building } from 'lucide-react';
import AttendanceTracker from './AttendenceTracker';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/outline';  // Importing Heroicons
import { useNavigate } from 'react-router-dom';


const ShowEvent = () => {
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [registrationStatus, setRegistrationStatus] = useState('Register');
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [attendanceData, setAttendanceData] = useState(null);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  const defaultImages = [
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/tkwokqxsgj6rgpso94jo.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/klwjnhtdi8ftizuchzjr.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/ew0ven2w1xaj6ayxs75w.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037786/obanbfiwfurp1wbbp3i6.png'
  ];

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const eventId = location.pathname.split('/').pop();
        const token = localStorage.getItem('token');
        const userString = localStorage.getItem('user');
        const userData = userString ? JSON.parse(userString) : null;
        setUser(userData);

        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        const data = await response.json();

        if (data.success) {
          setEvent(data.event);
          setAttendees(data.attendees || []);
console.log(data)
          const isRegistered = data.attendees?.some(
            attendee => attendee._id === userData?.userId
          );
          setRegistrationStatus(isRegistered ? 'Registered' : 'Register');
        } else {
          toast.error('Failed to load event');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error loading event');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [location,registrationStatus]);

  const handleRegistration = async () => {
    try {
      const eventId = location.pathname.split('/').pop();
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Successfully registered for the event');
        setRegistrationStatus('Registered');
        setAttendees(data.attendees || []);
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Registration failed');
    }
  };
  const handleEditEvent = (eventId) => {
    navigate(`/events/${eventId}/edit`);
  };
  const handleUnregister = async () => {
    try {
      const eventId = location.pathname.split('/').pop();
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/events/${eventId}/unregister`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Successfully unregistered from the event');
        setRegistrationStatus('Register');
        setAttendees(data.attendees || []);
      } else {
        toast.error(data.message || 'Failed to unregister');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to unregister');
    }
  };
  const fetchAttendanceData = async () => {
    try {
      setLoadingAttendance(true);
      const eventId = location.pathname.split('/').pop();
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/events/${eventId}/attendance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (data.success) {
        setAttendanceData(data);
        setIsAttendanceModalOpen(true);
      } else {
        toast.error(data.message || 'Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoadingAttendance(false);
    }
  };


  const Modal = ({ attendees, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (<div>
      <div className="fixed inset-0 pl-10 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-2xl transform transition-all">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendees</h2>
                <p className="text-sm text-gray-500 mt-1">{attendees.length} people attending</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {attendee.name?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium text-gray-900 truncate">{attendee.name}</p>
                    {attendee.email && (
                      <p className="text-sm text-gray-500 truncate">{attendee.email}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">Event not found</p>
      </div>
    );
  }

  const sliderImages = event.images?.length > 0 ? event.images.map(img => img.url) : defaultImages;

  return (
    <div className="min-h-screen bg-gray-50/50 ">
      {/* Hero Section */}
      <div className="w-full h-[500px] z-[0] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        <TopSlider images={sliderImages} captions={[]} htmlContent={[]} />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(event.dateTime)}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {event.location}
                </span>
                <span className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  {event.organizer}
                </span>
                {user.role==='campus'?<span className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditEvent(event._id)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button></span>:<span></span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">About this event</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Event Images */}
            {event.images && event.images.length > 0 && (
              <div className="grid grid-cols-2 gap-6 z-[-1]">
                {event.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Event ${index + 1}`}
                    className="rounded-2xl w-full h-64 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <div className="space-y-6">
                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {event.price ? `$${event.price}` : 'Free'}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {event.status}
                  </span>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5" />
                    <span>{event.capacity} spots available</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>Registration ends {formatDate(event.registrationDeadline)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Tag className="w-5 h-5" />
                    <span>{event.category}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  {user && user.role !== 'campus' && (
                    <button
                      onClick={registrationStatus === 'Registered' ? handleUnregister : handleRegistration}
                      className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all ${registrationStatus === 'Registered'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } hover:shadow-lg`}
                    >
                      {registrationStatus === 'Registered' ? 'Unregister' : 'Register Now'}
                    </button>
                  )}

                  {/* Add the AttendanceTracker for campus users */}
                  {user && user.role === 'campus' && (
                    <AttendanceTracker eventId={event._id} />
                  )}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-3 px-4 rounded-xl font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    View Attendees ({attendees.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendees Modal */}
      <Modal
        attendees={attendees}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ShowEvent;