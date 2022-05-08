import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/book.css'

function Booking(props) {

    const [show, setshow] = useState()
    const [row, setrow] = useState()
    const [col, setcol] = useState()
    const [seats, setseats] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8070/show/getone/${props.match.params.id}`).then((data) => {
            setshow(data.data)
            setrow(data.data.hid.rows)
            setcol(data.data.hid.cols)
            setseats(data.data.hid.seats)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    var ibreak = false;
    const isbrake = (num) => {
        if (num % col === 0) {
            ibreak = true;
        }
        else {
            ibreak = false
        }
    }


    return (
        <div className='bok container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-5 '>


                    <ul className='showcase'>
                        <li>
                            <div className='seat'></div>
                            <small>NA</small>
                        </li>

                        <li>
                            <div className='seat selected'></div>
                            <small>selected</small>
                        </li>

                        <li>
                            <div className='seat ocupied'></div>
                            <small>ocupied</small>
                        </li>
                    </ul>
                    <div className='container con'>
                        <div className='screen'></div>

                        <div className='rows'>
                            {seats.map((s, i) => (
                                <>

                                    <div className='seat'></div>
                                    {isbrake(i + 1)}
                                    {ibreak ? <br></br> : <></>}
                                </>
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Booking;