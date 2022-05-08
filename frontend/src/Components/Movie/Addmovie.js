import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Card } from 'antd';
import { getcategories } from '../../Actions/CategoryActions';
import Checkbox from './Checkbox';
import { getHalls } from '../../Actions/Hall';
const { Meta } = Card;
function Addmovie(props) {

    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [to, setto] = useState("");
    const [from, setfrom] = useState("");
    const [formdata, setformdata] = useState(null);
    const [ida, setida] = useState([])

    let arry = []
    let data = new FormData();

    const { categories } = useSelector(state => state.categories);
    const { halls } = useSelector(state => state.halls);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcategories())
        dispatch(getHalls())


    }, [])


    const upload = ({ target: { files } }) => {

        data.append("studentImage", files[0]);

        data.append("imgname", files[0].name);


    }
    data.append("studentImage", formdata);
    data.append("name", name);

    data.append("description", description);
    data.append("to", to);
    data.append("from", from);


    function sendData(e) {


        data.append("arr", JSON.stringify(ida))


        console.log(ida)
        e.preventDefault();


        console.log(data.name)

        axios.post("http://localhost:8070/movies/add", data).then(() => {
            alert("movie added");



        }).catch((err) => {
            alert(err);
        })
    }
    const handleFilters = (id) => {

        arry = id;
        setida(arry)
    }




    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-4'>
                    <form onSubmit={sendData}>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" onChange={(e) => { setName(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="text" className="form-control" onChange={(e) => { setdescription(e.target.value) }} placeholder="description" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="date" className="form-control" onChange={(e) => { setfrom(e.target.value) }} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">@</span>
                            </div>
                            <input type="date" className="form-control" onChange={(e) => { setto(e.target.value) }} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>



                        <Checkbox areas={categories}
                            handleFilters={filters => handleFilters(filters, 'area')} />




                        <div className="input-group mb-3">
                            <input type="file" onClick={(e) => { console.log(ida) }} onChange={upload} id="inputGroupFile04" />
                        </div>

                        <input type='submit' value="Create" className='btn btn-warning' />
                    </form>
                </div>

            </div >

        </div >
    );
}

export default Addmovie;