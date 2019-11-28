import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {ImagePath} from "../../config/config";
import Moment from "react-moment";

const MoviePosterCard = ({movie}) => {
    return (
        <div className="col-md-3">
            <div className="card shadow bg-white rounded">
                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                className="card-img-top"
                                src={ImagePath+''+movie.backdrop_path}
                                alt={movie.title}
                            />
                        </Link>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-10 my-auto">
                        <span className="card-title font-weight-bold">{movie.title}</span>
                        <br />
                        <span className="card-subtitle">
                                <Moment format="DD MMMM, YYYY">
                                    {movie.release_date}
                                </Moment>
                            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

MoviePosterCard.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MoviePosterCard;
