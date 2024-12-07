import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CreateEvent from '../components/CreateEvent'
export default function CreateEventPage() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
                <CreateEvent/>
            </div>
            <Footer />
        </div>
    )
}
