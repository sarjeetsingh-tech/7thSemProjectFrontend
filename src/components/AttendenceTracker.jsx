import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock3, AlertCircle } from 'lucide-react';

const AttendanceTracker = ({ eventId }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:3000/events/${eventId}/attendance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (data.success) {
        setAttendanceData(data);
        setIsModalOpen(true);
      } else {
        toast.error(data.message || 'Failed to fetch attendance data');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  const AttendanceModal = () => {
    if (!isModalOpen || !attendanceData) return null;

    const { statistics, attendanceData: attendees } = attendanceData;

    const getStatusIcon = (status) => {
      switch (status) {
        case 'attended':
          return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'cancelled':
          return <XCircle className="w-5 h-5 text-red-500" />;
        case 'waitlisted':
          return <Clock3 className="w-5 h-5 text-orange-500" />;
        default:
          return <AlertCircle className="w-5 h-5 text-blue-500" />;
      }
    };

    return (
      <div className="fixed inset-0 pl-10 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
           onClick={() => setIsModalOpen(false)}>
        <div onClick={e => e.stopPropagation()} 
             className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Attendance Details</h2>
                <p className="text-sm text-gray-500 mt-1">Event attendance statistics and details</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="text-blue-700 font-medium">Total Registered</h3>
                <p className="text-2xl font-bold text-blue-900">{statistics.totalRegistered}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <h3 className="text-green-700 font-medium">Attended</h3>
                <p className="text-2xl font-bold text-green-900">{statistics.attended}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl">
                <h3 className="text-orange-700 font-medium">Waitlisted</h3>
                <p className="text-2xl font-bold text-orange-900">{statistics.waitlisted}</p>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Attendee</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Registration Date</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Check-in</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Check-out</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((attendee, index) => (
                    <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{attendee.user.name}</p>
                          <p className="text-sm text-gray-500">{attendee.user.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(attendee.status)}
                          <span className="capitalize">{attendee.status}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">
                        {new Date(attendee.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-gray-600">
                        {attendee.checkinTime ? new Date(attendee.checkinTime).toLocaleTimeString() : '-'}
                      </td>
                      <td className="p-4 text-gray-600">
                        {attendee.checkoutTime ? new Date(attendee.checkoutTime).toLocaleTimeString() : '-'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          attendee.paymentStatus === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : attendee.paymentStatus === 'refunded'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {attendee.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={fetchAttendanceData}
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl font-medium text-white bg-green-500 hover:bg-green-600 transition-all hover:shadow-lg"
      >
        {loading ? 'Loading...' : 'View Attendance Data'}
      </button>
      <AttendanceModal />
    </>
  );
};

export default AttendanceTracker;