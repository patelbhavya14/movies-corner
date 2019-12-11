import React, {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {ImagePath} from "../../config/config";
import {Link} from "react-router-dom";
import Moment from "react-moment";

const MovieCard = ({movie, type, action, onEdit}) => {
    useEffect(() => {
        if(type === 'search')
            setImage(`${ImagePath}`+`${movie.backdrop_path}`);
        else if(type === 'reviews')
            setImage(`${ImagePath}`+`${movie.movie.movieImage}`);
        else
            setImage(`${ImagePath}`+`${movie.movieImage}`);
    },[]);
    const [image, setImage] = useState('');


    return (
        <div className="card card-horizontal ml-5 mr-5 rounded mb-1 m-2">
            <div className="card-row text-decoration-none">
                <div className="col-md-3 p-0">
                    {
                        type !== 'reviews' && (<Link to={type === 'search'? `/movie/${movie.id}`:`/movie/${movie.movieId}`}>
                            <img
                                alt="thumbnail"
                                className="card-item-first img-fluid"
                                src={image}
                            />
                        </Link>)
                    }

                    {
                        type === 'reviews' && (<Link to={`/movie/${movie.movie.movieId}`}>
                            <img
                                alt="thumbnail"
                                className="card-item-first img-fluid"
                                src={image}
                            />
                        </Link>)
                    }
                </div>



                <div className="col-md-9 align-self-center">
                    <section className="align-self-center text-decoration-none">
                        <span className="card-title h1" style={{fontSize: "200%"}}>
                            {
                                type === 'search' && `${movie.title}`
                            }
                            {
                                (type === 'watchlist' || type === 'ratings') && `${movie.movieName}`
                            }
                            {
                                type === 'reviews'  && `${movie.movie.movieName}`
                            }
                        </span>
                        {
                            type === 'reviews' &&
                            <span className="float-right text-dark mt-2">
                                <i className="fas fa-trash-alt h1 text-danger btn" onClick={
                                    (e)=>action(movie)
                                }/>
                            </span>
                        }

                        {
                            type === 'search' && <p className="card-text text-dark">{movie.overview}</p>
                        }

                        {
                            type === 'ratings' && (
                                <p className='text-dark'>
                                    <span className="h1">
                                        {movie.rating}/<span className="h3">10</span>
                                    </span>
                                </p>
                            )
                        }

                        {
                            type === 'reviews' && (
                                <Fragment>
                                    <p className='text-dark'>
                                        <span className="font-italic">
                                            {movie.review}
                                        </span>
                                    </p>
                                    <p className="small text-dark">
                                        <Moment format="D MMM YYYY" withTitle>
                                            {movie.review.reviewDate}
                                        </Moment>
                                    </p>
                                </Fragment>
                            )
                        }

                    </section>
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    type: PropTypes.string.isRequired,
    movie: PropTypes.object.isRequired
};

export default MovieCard;
