import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CampusDashboard from '../components/CampusDashboard'
export default function CreateEventPage() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
                <CampusDashboard/>
            </div>
            <Footer />
        </div>
    )
}
