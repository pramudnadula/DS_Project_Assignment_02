import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getfiltermovies } from '../../Actions/MovieActions';
import "../../Assets/Styles/home.css"
import { groups } from './GroupNum'
import { Card } from 'antd';
import { getcategories } from '../../Actions/CategoryActions';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import { Radio } from 'antd';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom'
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
function Allmovies(props) {

    const { categories } = useSelector(state => state.categories);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getcategories())
        LoadfilterResults(myFilters.filters)

    }, [])

    const [limit, setlimit] = useState(6)
    const [skip, setskip] = useState(0)
    const [type, settype] = useState(false);
    const [size, setsize] = useState(0)
    const [filterResults, setfilterResults] = useState(0)
    const [myFilters, setmyFilters] = useState({
        filters: { area: [], groups: [] }
    })


    const handleFilters = (filters, filterby) => {
        const newfilter = { ...myFilters }
        newfilter.filters[filterby] = filters
        if (filterby == "groups") {
            let pricevalues = handleprice(filters)
            newfilter.filters[filterby] = pricevalues
        }
        LoadfilterResults(myFilters.filters)
        setmyFilters(newfilter)
    }
    function handleprice(values) {
        const data = groups
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(values)) {
                array = data[key].array
            }
        }
        return array;
    }


    function LoadfilterResults(newfilter) {

        getfiltermovies(skip, limit, newfilter).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults(data.data)
                setsize(data.size)
                setskip(0)
            }
        })
    }

    const loadmorebutton = () => {
        return (
            size > 0 && size >= limit && (
                <button className='btn btn-warning mb-5' onClick={loadmore}>
                    loadMore
                </button>
            )
        )
    }

    // const searchbar = () => {
    //     return (
    //         <Paper

    //             component="form"
    //             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    //         >

    //             <InputBase
    //                 sx={{ ml: 1, flex: 1 }}
    //                 placeholder="dd"
    //                 inputProps={{ 'aria-label': 'search google maps' }}
    //             />
    //             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
    //                 <SearchIcon />
    //             </IconButton>
    //             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

    //         </Paper>
    //     )
    // }

    function loadmore() {
        let toskip = skip + limit
        getfiltermovies(toskip, limit, myFilters.filters).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setfilterResults([...filterResults, ...data.data])
                setsize(data.size)
                setskip(toskip)
            }
        })
    }


    return (

        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-12'><div className='row justify-content-center mt-5 mb-5'><h1 className='col-4 main_txt'>asas</h1><div className='col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12'></div></div></div>
                <div className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 brand mb-5'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-6'>
                            <h3 className='filter'>Research Area</h3>
                            <Checkbox areas={categories}
                                handleFilters={filters => handleFilters(filters, 'area')} />

                        </div>
                    </div>

                    <div className='row justify-content-center mt-5 mb-5'>
                        <Radio.Group className='col-xl-8 col-lg-8 col-md-8 col-sm-8 col-6'>
                            <h3 className='filter'>Alocated Groups</h3>
                            <Radiobox groups={groups}
                                handleFilters={filters => handleFilters(filters, 'groups')} />
                        </Radio.Group>
                    </div>

                </div>
                <div className='col-xl-8 col-lg-8 col-md-8 col-sm-10 col-12'>
                    <div className='row justify-content-center m_row'>
                        {filterResults ? (filterResults.map((mov, i) => (
                            <div className='col-3'>
                                <Link to={`/view/${mov._id}`}><MovieCard movie={mov} /></Link>
                            </div>

                        ))) : ''}

                    </div>
                </div>
            </div>
            {loadmorebutton()}
        </div>
    );
}

export default Allmovies;