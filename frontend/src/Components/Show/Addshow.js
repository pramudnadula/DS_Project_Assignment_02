import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import { getHalls } from '../../Actions/Hall';
import { getmovies } from '../../Actions/MovieActions';
import { useSelector, useDispatch } from 'react-redux'
function Addshow(props) {
    const [mid, setmid] = useState("")
    const [hid, sethid] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const { halls } = useSelector(state => state.halls);
    const { movies } = useSelector(state => state.movies);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getHalls())
        dispatch(getmovies())
    }, [])

    const createshow = (e) => {
        e.preventDefault()

        const show = {
            hid,
            mid,
            date,
            time
        }
        console.log(show)

        axios.post('http://localhost:8070/show', show).then((data) => {
            console.log("created")

        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div className='row'>
            <div className='col-6'>
                <form onSubmit={createshow}>
                    <label>select Movie</label>
                    <select onChange={(e) => { setmid(e.target.value) }}>
                        <option>select option</option>
                        {movies.map(m => (
                            <option value={m._id}>{m.name}</option>
                        ))}
                    </select><br></br><br></br>

                    <label>select Hall</label>

                    <select onChange={(e) => { sethid(e.target.value) }}>
                        <option>select option</option>
                        {halls.map(m => (
                            <option value={m._id}>{m.name}</option>
                        ))}
                    </select><br></br><br></br>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">select the date</span>
                        </div>
                        <input type="date" className="form-control" onChange={(e) => { setdate(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div><br></br><br></br>

                    <label>select Time slot</label>
                    <select onChange={(e) => { settime(e.target.value) }}>
                        <option>select option</option>
                        <option value="1">10.00am - 1.00 pm</option>
                        <option value="2">1.00pm - 4.00 pm</option>
                        <option value="3">4.00pm - 7.00 pm</option>
                    </select><br></br><br></br>
                    <input type="submit" value="create" />
                </form>
            </div>
        </div>
    );
}

export default Addshow;