import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditEvent from '../components/EditEvent';

export default function CreateEventPage() {


    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
                
               <EditEvent  /> 
            </div>
            <Footer />
        </div>
    );
}
