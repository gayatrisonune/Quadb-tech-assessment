import React from 'react'
import axios from 'axios'
import Card from './Card'


export default function Page1() {
    const [data, setData] = React.useState([])
    const getData = () => {
        axios.get('https://api.tvmaze.com/search/shows?q=all')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        getData()
    }, [])


    return (
        <div>
            {
                (data) ? data.map((show) => {
                    return (
                        <Card data={show} />
                    )
                }) : <h1>Loading...</h1>
            }
        </div>
    )
}
