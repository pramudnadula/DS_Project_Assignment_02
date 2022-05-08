import axios from 'axios';
import React, { useState } from 'react';
import { message } from 'antd'

function AddHall(props) {
    const [name, setname] = useState("")
    const [cols, setcols] = useState("")
    const [rows, setrows] = useState("")
    const [rate, setrate] = useState("")

    const createHall = (e) => {
        e.preventDefault()

        const hall = {
            name,
            cols,
            rows,
            rate
        }

        axios.post('http://localhost:8070/hall', hall).then((data) => {

        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div className='row'>
            <div className='col-6'>
                <form onSubmit={createHall}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Name</span>
                        </div>
                        <input type="text" className="form-control" onChange={(e) => { setname(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Seat rows</span>
                        </div>
                        <input type="number" className="form-control" onChange={(e) => { setrows(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Seats for a row</span>
                        </div>
                        <input type="number" className="form-control" onChange={(e) => { setcols(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Rate</span>
                        </div>
                        <input type="text" className="form-control" onChange={(e) => { setrate(e.target.value) }} placeholder="name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <input type="submit" value="create" />
                </form>
            </div>
        </div>
    );
}

export default AddHall;