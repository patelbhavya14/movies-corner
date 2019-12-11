import React from 'react';
import PropTypes from 'prop-types';
import {ImagePath} from "../../config/config";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const MovieCarouselCard = ({movie}) => {
    return (
        <div className="p-2">
            <div className="card m-3">
                <Link to={`/movie/${movie.id}`}>
                <img
                    alt="thumbnail"
                    className="card-img-top"
                    src={`${ImagePath}${movie.poster_path}`}
                />
                </Link>
                <div className="card-body text-center">
                    <h3 className="card-title">{movie.title}</h3>
                    <p className="card-subtitle">
                        <Moment format="DD MMMM, YYYY">
                            {movie.release_date}
                        </Moment>
                    </p>
                </div>
            </div>
        </div>
    );
};

MovieCarouselCard.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieCarouselCard;
