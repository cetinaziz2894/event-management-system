import React, { useEffect, useState } from 'react'
import "../assets/styles/_eventdetailpage.scss";
import { useAuth } from '../context/AuthContext';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Loader from './shared/Loader';

export default function EventDetailPage() {
    const { currentUser, checkIn, getUser, getParticipants } = useAuth();
    const [showButton, setShowButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attendedCount, setAttendedCount] = useState(0);

    const checkInHandler = async(id) => {
        setLoading(false);
        try {
            let result = await checkIn(id);
            if(result === "success"){
                const users = await getParticipants();
                setAttendedCount(users.filter((el) => el.isAttended === true).length)
                setShowButton(false);
                setLoading(true);
            }
        } catch {
            alert("Failed to check in.");
            setLoading(true);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        setLoading(false);
        try {
            const user = await getUser(currentUser?.uid);
            setShowButton(!user.data()?.isAttended);
            setLoading(true);
          } catch {
              console.log("Error");            
              setLoading(true);
          }
      }, [currentUser?.uid, getUser])

      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(async() => {
          setLoading(false);
        try {
            const users = await getParticipants();
            setAttendedCount(users.filter((el) => el.isAttended === true).length)
            setLoading(true);
        } catch {
            console.log("Failed to get attendeded participants.");
            setLoading(true);
          }
      }, [currentUser, getParticipants])
    return (
        <>
            <Header />
                <div className="main">
                    {
                        loading ?<div className="content">
                        <h2 className="name">Event Detail</h2>
                        <p className="description">Vivamus at lacus sit amet mauris accumsan faucibus. Phasellus congue ultrices tortor ac rutrum. Etiam imperdiet id nibh eget consequat. Maecenas varius tempus nulla, sit amet bibendum mi tempus at. Ut porttitor turpis non nisi porta.</p>
                        {
                            showButton && <button className="button check-in" onClick={()=> checkInHandler(currentUser?.uid)}>Check In</button>
                        }
                        <p>{attendedCount} particiapants will attanded this event {!showButton &&  <>with you.</>}</p>
                    </div> : <Loader />
                    }
                </div>
            <Footer />
        </>
    )
}
