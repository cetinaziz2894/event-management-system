import React, { useEffect, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import '../assets/styles/_participantlistpage.scss';
import { useAuth } from '../context/AuthContext';
import Footer from './shared/Footer';
import Header from './shared/Header';
import Loader from './shared/Loader';


export default function ParticipantListPage() {
    const { getParticipants, userInfo, currentUser, changeIsAttandedStatus } = useAuth();
    const [participantsData, setparticipantsData] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [participantsIntable, setParticipantsIntable] = useState([])
    const [setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState("")
    const [page, setPage] = useState(1);

    const startPageHandler = () => {
        setPage(1);
        setParticipantsIntable(participants.slice(0, 1*5));
    }

    const endPageHandler = () => {
        setPage(Math.ceil(participants.length / 5));
        setParticipantsIntable(participants.slice(participants.length-5, participants.length));
    }

    const nextPageHandler = () => {
        if (page >= Math.ceil(participants.length / 5)) {
            setPage(Math.ceil(participants.length / 5));
            setParticipantsIntable(participants.slice(participants.length-5, participants.length));
        }
        else{
            setParticipantsIntable(participants.slice(page*5, (page+1)*5));
            setPage(page+1);
        }
    }

    const prevPageHandler = () => {
        setPage(page-1);
        if (page < 0) {
            setPage(0);
            setParticipantsIntable(participants.slice(0, 5));
        }
        else{
            setPage(page-1);
            setParticipantsIntable(participants.slice((page-2)*5, (page-1)*5));
        }
    }

    const changeStatusIsAttandedHandler = async(id,status) => {
        console.log(id,status)
        setLoading(false);
        try {
            let result = await changeIsAttandedStatus(id,status);
            if(result === "success"){
                const users = await getParticipants();
                setPage(1);
                setParticipants(users);
                setparticipantsData(users);
                setParticipantsIntable(users.slice(0,5));
                setLoading(true);
            }
        } catch {
            alert("Failed to check in.");
            setLoading(true);
        }
    }

    const searchHandler = (item) => {
        setLoading(false);
        const searchItems = participantsData.filter(el => el.fullname.toLowerCase().includes(item));
        setParticipants(searchItems);
        if(searchItems.length === 0){
            alert("No item is found.");
            setSearchItem("");
            setParticipants(participantsData);
            setParticipantsIntable(participantsData.slice(0,5));
            setPage(1)
            setLoading(true);
        }else{
            setParticipants(searchItems);
            setParticipantsIntable(searchItems.slice(0,5));
            setPage(1);
            setLoading(true);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async() => {
        try {
            setLoading(false);
            const data = await getParticipants();
            setParticipants(data);
            setparticipantsData(data);
            setParticipantsIntable(data.slice(0,5));
            setLoading(true);
            } catch {
            setError("Failed to get participants.");
            setLoading(true);
            }
        }, [getParticipants, setError])

    return (
        <>
            <Header />
            <div className="main">
                {
                    loading ? <div className="content table-div">
                    <div className="search">
                        <input 
                            className="search-input"
                            type="text" 
                            name="search" 
                            placeholder="Search by full name"
                            value={searchItem}
                            onChange={(e)=> setSearchItem(e.target.value)} />
                        <button
                            className="search-button"
                            type="submit"
                            onClick={ () => searchHandler(searchItem)}
                            >
                            Search
                        </button>
                    </div>
                    <div className="table">
                    {
                        <table>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>HES Code</th>
                                    <th>Is Attandent</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                            {
                                participantsIntable && participantsIntable.map((el,index) => (
                                        <tr key={index}>
                                            <td>{el?.fullname}</td>
                                            <td>{el?.email}</td>
                                            <td>{el?.hesCode}</td>
                                            <td>{
                                                el?.isAttended 
                                                ? <span><FaThumbsUp color="green" /></span> :
                                                    (el?.email === userInfo?.email && el?.isAttended === false) ?
                                                    <button className="check-in-btn button" onClick={()=> changeStatusIsAttandedHandler(currentUser?.uid, el?.isAttended)}>Check In</button> : <FaThumbsDown color="red" />
                                                }
                                            </td>
                                        </tr>
                                    
                                ))
                            }
                        </tbody>
                    </table>
                    }
                    </div>
                    <div className="pagination">
                        <FaAngleDoubleLeft style={{visibility: page === 1 ? 'hidden': 'visible'}} onClick={() => startPageHandler()} />    
                        <FaAngleLeft style={{visibility: page === 1 ? 'hidden': 'visible'}} onClick={() => prevPageHandler()} />
                        <span style={{visibility: participants.length  < 5  ? 'hidden': 'visible'}}>{page}</span>
                        <FaAngleRight style={{visibility: page*5 >=  Math.ceil(participants.length) ? 'hidden': 'visible'}} onClick={() => nextPageHandler()} />    
                        <FaAngleDoubleRight style={{visibility:page*5 >=  Math.ceil(participants.length) ? 'hidden': 'visible'}} onClick={() => endPageHandler()} />
                    </div>
                </div>
                : <Loader />
                }
                
            </div>
            <Footer />
        </>
    )
}
