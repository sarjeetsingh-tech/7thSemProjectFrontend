import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserDashboard from '../components/UserDashboard'
export default function CreateEventPage() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
                <UserDashboard/>
            </div>
            <Footer />
        </div>
    )
}
