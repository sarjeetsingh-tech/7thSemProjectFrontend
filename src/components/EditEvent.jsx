import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { CiCircleRemove } from "react-icons/ci";
import { FiUploadCloud } from 'react-icons/fi';
import SloganRotator from './SloganRotator';
import { useNavigate } from 'react-router-dom';

const EditEvent = () => {
    const uploadMessages = [
        "Update your event images to keep content fresh!",
        "Add new photos to showcase event highlights",
        "Keep your event visually engaging with updated images",
        "Refresh your event's appeal with new photos",
        "Update images to reflect your event's evolution"
    ];
    const navigate = useNavigate();

    const [eventId, setEventId] = useState('');
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '',
        organizer: '',
        category: '',
        capacity: '',
        registrationDeadline: '',
        price: '',
        pinCode: '',
        campus: '',
        status: ''
    });
    const [images, setImages] = useState([]);
    const [newImages, setNewImages] = useState([]);

    useEffect(() => {
        const url = window.location.href;
        const eventIdFromURL = url.split('/').slice(-2)[0];
        setEventId(eventIdFromURL);
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventId) return;
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setEventData(data.event);
                    setImages(data.event.images || []);
                    
                }
            } catch (error) {
                toast.error('Failed to fetch event details');
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(prevImages => [...prevImages, ...files]);
    };

    const handleRemoveNewImage = (index) => {
        setNewImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            // Append all event data
            Object.keys(eventData).forEach(key => {
                formData.append(key, eventData[key]);
            });

            // Append existing images info
            formData.append('existingImages', JSON.stringify(images));

            // Append new images
            newImages.forEach(file => {
                formData.append('images', file);
            });

            const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Event updated successfully');
                navigate(`/events/${eventId}`);
            }
        } catch (error) {
            toast.error('Failed to update event');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 mx-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <h1 className="text-3xl font-bold">Edit Event</h1>
                        <p className="mt-2 text-blue-100">Update your event details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Image Upload */}
                            <div className="space-y-6">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
                                    <div className="text-center">
                                        <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <label htmlFor="file-upload" className="cursor-pointer">
                                                <span className="mt-2 text-sm text-gray-600">
                                                    Drop files to upload or
                                                    <span className="text-blue-500 font-medium ml-1">browse</span>
                                                </span>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {images.length === 0 && newImages.length === 0 ? (
                                    <div className="text-center py-4">
                                        <SloganRotator slogans={uploadMessages} />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Existing Images */}
                                        {images.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">Current Images</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {images.map((image, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={image.url}
                                                                alt={`Event ${index + 1}`}
                                                                className="w-full h-40 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveExistingImage(index)}
                                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <CiCircleRemove className="text-red-500 text-xl" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* New Images */}
                                        {newImages.length > 0 && (
                                            <div>
                                                <h3 className="text-lg font-medium mb-2">New Images</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {newImages.map((file, index) => (
                                                        <div key={index} className="relative group">
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={`New ${index + 1}`}
                                                                className="w-full h-40 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveNewImage(index)}
                                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <CiCircleRemove className="text-red-500 text-xl" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Event Details */}
                            <div className="space-y-6">
                                <TextField
                                    fullWidth
                                    label="Event Title"
                                    variant="outlined"
                                    value={eventData.title}
                                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                                />

                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={eventData.description}
                                    onChange={(e) => setEventData({...eventData, description: e.target.value})}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        variant="outlined"
                                        value={eventData.location}
                                        onChange={(e) => setEventData({...eventData, location: e.target.value})}
                                    />
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label="Date and Time"
                                        variant="outlined"
                                        value={eventData.dateTime}
                                        onChange={(e) => setEventData({...eventData, dateTime: e.target.value})}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Organizer"
                                        variant="outlined"
                                        value={eventData.organizer}
                                        onChange={(e) => setEventData({...eventData, organizer: e.target.value})}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        variant="outlined"
                                        value={eventData.category}
                                        onChange={(e) => setEventData({...eventData, category: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Capacity"
                                        type="number"
                                        variant="outlined"
                                        value={eventData.capacity}
                                        onChange={(e) => setEventData({...eventData, capacity: e.target.value})}
                                    />
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label="Registration Deadline"
                                        variant="outlined"
                                        value={eventData.registrationDeadline}
                                        onChange={(e) => setEventData({...eventData, registrationDeadline: e.target.value})}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        value={eventData.price}
                                        onChange={(e) => setEventData({...eventData, price: e.target.value})}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Pin Code"
                                        variant="outlined"
                                        value={eventData.pinCode}
                                        onChange={(e) => setEventData({...eventData, pinCode: e.target.value})}
                                    />
                                </div>

                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    variant="outlined"
                                    value={eventData.status}
                                    onChange={(e) => setEventData({...eventData, status: e.target.value})}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="past">Past</option>
                                </TextField>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Update Event
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;