import React from 'react'
import { Link } from 'react-router-dom';
import '../assets/styles/_eventpage.scss';
import Footer from './shared/Footer';
import Header from './shared/Header';

export default function EventPage() {

    return (
        <>
            <Header />
            <div className="main">
                <div className="content">
                    <h2 className="name">Welcome to Event</h2>
                    <p className="description">Vivamus at lacus sit amet mauris accumsan faucibus. Phasellus congue ultrices tortor ac rutrum. Etiam imperdiet id nibh eget consequat. Maecenas varius tempus nulla, sit amet bibendum mi tempus at. Ut porttitor turpis non nisi porta.</p>
                    <Link to='/event-detail' className="button">View Event</Link>
                </div>
            </div>
            <Footer />
        </>
    )
}
