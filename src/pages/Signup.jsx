import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthImage from "../components/AuthImage";
import SignupForm from "../components/SignupForm";


export default function Signin() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
        <SignupForm />
        <AuthImage />
      </div>
      <Footer />
    </div>
  );
}
