import React, { useState } from 'react';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { CiCircleRemove } from "react-icons/ci";
import SloganRotator from './SloganRotator';
import { FiUploadCloud } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
    const uploadMessages = [
        "Adding eventImages can attract more attendees and make your event stand out!",
        "Enhance the appeal of your event by uploading captivating eventImages.",
        "Pictures speak louder than words! Upload eventImages to showcase the excitement of your events.",
        "Captivate your audience with stunning event photos. Don't miss out on this opportunity!",
        "Visuals are key to grabbing attention. Upload eventImages to make your events unforgettable.",
        "Give attendees a sneak peek of what's in store by uploading vibrant event eventImages.",
        "Make your events unforgettable with compelling visuals. Upload eventImages now!",
    ];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '',
        organizer: '',
        category: '',
        capacity: '',
        registrationDeadline: '',
        price: '',
        status: '',
        pinCode: '',
        campus: '',
        images: [] // To store the selected eventImages
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const updatedImages = Array.from(files);
        setFormData(prevState => ({
            ...prevState,
            images: updatedImages // Changed from eventImages to images
        }));
    };

    const handleRemoveImage = (index) => {
        const updatedImages = formData.images.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            images: updatedImages // Changed from eventImages to images
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();

            // Append all non-file fields
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'images') {
                    formDataToSend.append(key, value);
                }
            });

            // Append images with correct field name
            formData.images.forEach((file) => {
                formDataToSend.append('images', file);
            });

            const response = await fetch('http://localhost:3000/events/new', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success)
                    navigate('/campus-dashboard');
                else navigate('/events/new');
            } else {
                const error = await response.json();
                console.error('Error:', error);
                // Handle error (show toast message, etc.)
            }
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 mx-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <h1 className="text-3xl font-bold">Create New Event</h1>
                        <p className="mt-2 text-blue-100">Share your upcoming event with the community</p>
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

                                {formData.images.length === 0 ? (
                                    <div className="text-center py-4">
                                        <SloganRotator slogans={uploadMessages} />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                                        {formData.images.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-40 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <CiCircleRemove className="text-red-500 text-xl" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Event Details */}
                            <div className="space-y-6">
                                <TextField
                                    fullWidth
                                    label="Event Title"
                                    variant="outlined"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        variant="outlined"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label="Date and Time"
                                        variant="outlined"
                                        name="dateTime"
                                        value={formData.dateTime}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Organizer"
                                        variant="outlined"
                                        name="organizer"
                                        value={formData.organizer}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Category"
                                        variant="outlined"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Capacity"
                                        type="number"
                                        variant="outlined"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label="Registration Deadline"
                                        variant="outlined"
                                        name="registrationDeadline"
                                        value={formData.registrationDeadline}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        type="number"
                                        variant="outlined"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Pin Code"
                                        variant="outlined"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                    />
                                </div>

                                <TextField
                                    fullWidth
                                    select
                                    label="Status"
                                    variant="outlined"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option value="">Select Status</option>
                                    <option value="upcoming">upcoming</option>
                                    <option value="ongoing">ongoing</option>
                                    <option value="past">past</option>
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
                                Create Event
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
