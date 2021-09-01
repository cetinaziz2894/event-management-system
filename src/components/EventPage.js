import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/_eventpage.scss';
import { useAuth } from '../context/AuthContext';
import Footer from './shared/Footer';
import Header from './shared/Header';

export default function EventPage() {
    const { userInfo } = useAuth();
    
    return (
        <>
            <Header />
            <div className="main">
                <div className="content">
                    <h2 className="name">{userInfo?.fullname}, Welcome to Event</h2>
                    <p className="description">Vivamus at lacus sit amet mauris accumsan faucibus. Phasellus congue ultrices tortor ac rutrum. Etiam imperdiet id nibh eget consequat. Maecenas varius tempus nulla, sit amet bibendum mi tempus at. Ut porttitor turpis non nisi porta.</p>
                    <Link to='/event-detail' className="button">View Event</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}
