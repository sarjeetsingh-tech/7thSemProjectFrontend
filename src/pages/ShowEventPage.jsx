import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthImage from "../components/AuthImage";
import SignupForm from "../components/SignupForm";
import ShowEvent from '../components/ShowEvent';


export default function ShowEventPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex ml-40" style={{ paddingTop: '4rem' }}>
        <ShowEvent />
      </div>
      <Footer />
    </div>
  );
}
