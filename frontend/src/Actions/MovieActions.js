import axios from 'axios'



import { message } from 'antd'
export const getfiltermovies = (skip, limit, filters, isSupervisor) => {
    const data = {
        limit,
        skip,
        filters,

    }
    return fetch('http://localhost:8070/movies/by/search', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err)
    })
}

export const getmovies = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('http://localhost:8070/movies/list')
        dispatch({ type: "GET_ALL_MOVIES", payload: response.data })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false })
    }
}