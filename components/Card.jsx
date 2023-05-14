import React from 'react'
import '../styles/card.css'
import { Link } from 'react-router-dom'


export default function Card({ data }) {


    const movie = data ? data.show : "Loading"

    data && console.log(data.show.name)

    return (
        <div >
            <Link to={`/show/${movie.id}`} style={{
                textDecoration: "none",
                color: "black"
            }} state={movie}>
                <div class="movie_card" id="bright">
                    <div class="info_section">
                        <div class="movie_header">
                            <img class="locandina" src={movie.image && movie.image.medium} />
                            <h1>{movie.name}</h1>
                            <h4>{movie.premiered}</h4>
                            <span class="minutes">{`${movie.runtime} mins`}</span>
                            {movie.genres && movie.genres.map((genre) => {
                                return (
                                    <span class="genre">{genre}  </span>
                                )
                            }
                            )}
                            {/* <p class="type">{movie.genres }</p> */}
                        </div>
                        <div class="movie_desc">
                            <p class="text">
                                Language: {movie.language}<br />
                                <br />
                                Ratings: {(movie.rating) ? (movie.rating && movie.rating.average) : "N/A"}
                                <br />
                                <br />
                                Status: {movie.status}
                                <br />
                                <br />
                                Country: {(movie.network) ? (movie.network && movie.network.country.name) : "N/A"}
                            </p>
                        </div>
                        <div class="movie_social">
                            {/* <ul>
                            <li><i class="material-icons">share</i></li>
                            <li><i class="material-icons">chat_bubble</i></li>
                        </ul> */}
                        </div>
                    </div>
                    <div className='blur_back' style={{
                        backgroundImage: `url(${movie.image && movie.image.original})`
                    }}></div>
                </div>
            </Link>
        </div >
    )
}
