import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserProfile from '../components/UserProfile'

function UserProfilePage() {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex flex-grow border border-red bg-red-400" style={{ paddingTop: '4rem' }}>
                <UserProfile />
            </div>
            <Footer />
        </div>
    )
}

export default UserProfilePage
