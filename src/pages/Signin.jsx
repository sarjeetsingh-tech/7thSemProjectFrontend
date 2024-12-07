import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthImage from "../components/AuthImage";
import SigninForm from "../components/SigninForm";

export default function Signin() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow" style={{ paddingTop: '4rem' }}>
        <SigninForm />
        <AuthImage />
      </div>
      <Footer />
    </div>
  );
}
