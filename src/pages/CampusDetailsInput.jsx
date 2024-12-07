import React from 'react'
import CampusDetails from '../components/CampusDetails'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CampusDetailsInput() {
    return (
        <>
        <Navbar/>
        <div style={{ paddingTop: '4rem' }}>
        <CampusDetails />
        </div>
        <Footer/>
        </>

    )
}

export default CampusDetailsInput;
