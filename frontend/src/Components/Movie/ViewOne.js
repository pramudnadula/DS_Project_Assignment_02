import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getShows } from '../../Actions/ShowActions';
import '../../Assets/Styles/one.css'
function ViewOne(props) {
    const [movie, setmovie] = useState({});
    const [area, setarea] = useState([]);
    const { shows } = useSelector(state => state.shows);

    const dispatch = useDispatch()


    useEffect(() => {

        axios.get(`http://localhost:8070/movies/getone/${props.match.params.id}`).then((data) => {

            setmovie(data.data)
            setarea(data.data.area)

        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        dispatch(getShows(props.match.params.id))
    }, [])
    let range
    const getTime = (ind) => {

        if (ind === 1) {
            range = "10.00am - 1.00pm"
        } else if (ind === 2) {
            range = "1.00pm - 4.00pm"
        } else if (ind === 3) {
            range = "4.00pm - 7.00pm"
        }
    }
    return (
        <div className='container-fluid '>
            <div className="mc row">
                <div className=" co3 col-12">
                    <div className='row'>
                        <div className='col-12'>
                            <a href="#"><img src={"http://localhost:8070/" + movie?.image} alt="cover" className="cover img-fluid d-block" /></a>
                            <div className="hero">
                                <div className="details">
                                    <div className="title1">{movie?.name} <span>PG-13</span></div>
                                    <div className="title2">The Battle of the Five Armies</div>
                                    <fieldset className="rating">
                                        <input type="radio" id="star5" name="rating" defaultValue={5} /><label className="full" htmlFor="star5" title="Awesome - 5 stars" />
                                        <input type="radio" id="star4half" name="rating" defaultValue="4 and a half" /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars" />
                                        <input type="radio" id="star4" name="rating" defaultValue={4} defaultChecked /><label className="full" htmlFor="star4" title="Pretty good - 4 stars" />
                                        <input type="radio" id="star3half" name="rating" defaultValue="3 and a half" /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars" />
                                        <input type="radio" id="star3" name="rating" defaultValue={3} /><label className="full" htmlFor="star3" title="Meh - 3 stars" />
                                        <input type="radio" id="star2half" name="rating" defaultValue="2 and a half" /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars" />
                                        <input type="radio" id="star2" name="rating" defaultValue={2} /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars" />
                                        <input type="radio" id="star1half" name="rating" defaultValue="1 and a half" /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars" />
                                        <input type="radio" id="star1" name="rating" defaultValue={1} /><label className="full" htmlFor="star1" title="Sucks big time - 1 star" />
                                        <input type="radio" id="starhalf" name="rating" defaultValue="half" /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars" />
                                    </fieldset>
                                    <span className="likes">109 likes</span>
                                </div> {/* end details */}
                            </div> {/* end hero */}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="description">

                                <div className="column1">
                                    {area.map(s => (
                                        <span className="tag">{s.name}</span>
                                    ))}


                                </div> {/* end column1 */}
                                <div className="column2">
                                    <p>Bilbo Baggins is swept into a quest to reclaim the lost Dwarf Kingdom of Erebor from the fearsome dragon Smaug. Approached out of the blue by the wizard Gandalf the Grey, Bilbo finds himself joining a company of thirteen dwarves led by the legendary warrior, Thorin Oakenshield. Their journey will take them into the Wild; through... <a href="#">read more</a></p>

                                </div> {/* end column2 */}
                            </div> {/* end description */}
                        </div>
                    </div> {/* end container */}
                </div>
            </div> {/* end movie-card */}
            <div className='row'>
                <div className='col-10'>
                    <table>
                        <tr>
                            <th>No</th>
                            <th>Hall Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                        {shows.map((s, i) => (
                            <tr>
                                <td>{(i + 1)}</td>
                                <td>{s.name}</td>
                                <td>{s.date}</td>
                                {getTime(s.time)}
                                <td>{range}</td>
                                <td><Link to={`/booking/${s._id}`}><button className='btn btn-success'>Book</button></Link></td>
                            </tr>
                        ))}

                    </table>
                </div>
            </div>

        </div>

    );
}

export default ViewOne;