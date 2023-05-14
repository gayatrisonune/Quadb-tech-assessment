import React from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/page2.css'
import { Parser } from "html-to-react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import Modal from './Modal'

export default function Page2() {
    const location = useLocation()
    console.log(location.state)
    const movie = location.state

    // const MyComponent = () => {
    const htmlParser = new Parser();
    const htmlString = movie.summary;
    const check = (movie.status === "Ended") ? false : true

    const checkPrevUrl = (movie._links.previousepisode && (movie._links.previousepisode.href)) ? movie._links.previousepisode.href : movie._links.self.href
    const checkNextUrl = (movie._links.next && (movie._links.next.href)) ? movie._links.next.href : movie._links.self.href

    const [nextUrl, setNextUrl] = React.useState();
    const getNextEp = () => {
        axios.get(checkNextUrl)
            .then(res => {
                setNextUrl(res.data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        getNextEp()
    }, [])

    console.log(nextUrl)


    const [prevUrl, setPrevUrl] = React.useState();
    const getPrevEp = () => {
        axios.get(checkPrevUrl)
            .then(res => {
                setPrevUrl(res.data.url)
            })
            .catch(err => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        getPrevEp()
    }, [])

    console.log(prevUrl)
    const [showModal, setShowModal] = React.useState(false)



    return (
        <div>
            <div class="container">
                <div class="movie">
                    <img src={movie.image && movie.image.medium} alt="Movie Poster" />
                    <div class="movie-content">
                        <h2 class="movie-title">{movie.name}</h2>
                        <p class="movie-details">Release Year: {movie.premiered} |  {movie.genres && movie.genres.map((genre) => {
                            return (
                                <span class="genre">{genre}  </span>
                            )
                        }
                        )}</p>
                        <p class="movie-summary">{htmlParser.parse(htmlString)}</p>

                        <div class="buttons">
                            <Link to={movie.url}
                                style={{
                                    textDecoration: "none",
                                    color: "black"
                                }} >
                                <div class="watch-button">Watch Now</div>
                            </Link>
                            {check && <div class="watch-button" onClick={() => {
                                setShowModal(true)
                            }}>Book Ticket</div>}
                        </div>
                        <div class="episode-buttons">
                            <Link to={prevUrl} style={{
                                textDecoration: "none",
                                color: "black"
                            }} >
                                <div class="episode-button">Previous Episode</div>
                            </Link>
                            <Link to={nextUrl} style={{
                                textDecoration: "none",
                                color: "black"
                            }} >
                                <div class="episode-button">Next Episode</div>
                            </Link>

                        </div>
                        <p class="movie-status">Status: {movie.status}</p>
                        {check && <p class="movie-schedule">Time: {movie.schedule.time} | Days: {movie.schedule.days}</p>}
                        {/* <p class="movie-schedule">Time: {movie.schedule.time} | Days: {movie.schedule.days}</p> */}
                        {/* <p class="movie-status">Country: {(movie.network.country && movie.network.country.name) ? (movie.network.country.name) : "N/A"}</p> */}
                        <p class="movie-status">Language: {(movie.language) ? (movie.language) : "N/A"}</p>
                        <p class="movie-status">Runtime: {(movie.runtime) ? (movie.runtime) + " mins" : "N/A"}</p>
                        <p class="movie-status">Ratings: {(movie.rating.average) ? (movie.rating.average) : "N/A"}</p>

                    </div>

                </div>
            </div>

            {showModal && <Modal onClose={() => {
                setShowModal(false)
            }} data={movie} />}

        </div>

    )

}
