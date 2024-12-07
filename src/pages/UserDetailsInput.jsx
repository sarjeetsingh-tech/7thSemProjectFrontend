import React from 'react'
import UserDetails from '../components/UserDetails'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function UserDetailsInput() {
    return (
        <>
        <Navbar/>
        <UserDetails style={{ paddingTop: '4rem' }} />
        <Footer/>
        </>

    )
}

export default UserDetailsInput
