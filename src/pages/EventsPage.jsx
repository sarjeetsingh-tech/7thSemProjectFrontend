import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Events from '../components/Events'

function EventsPage() {
  return (
    <div>
      <Navbar/>
      <div style={{ paddingTop: '4rem' }}>
      <Events />
      </div>
      <Footer/>
    </div>
  )
}

export default EventsPage;
