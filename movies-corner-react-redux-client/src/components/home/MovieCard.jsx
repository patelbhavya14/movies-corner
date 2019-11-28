import React from 'react';
import PropTypes from 'prop-types';
import {ImagePath} from "../../config/config";
import {Link} from "react-router-dom";

const MovieCard = ({movie}) => {
    return (
        <div className="card card-horizontal">

            <div className="card-row text-decoration-none">

                <div className="col-md-3 p-0">
                    <Link to={`/movie/${movie.id}`}>
                        <img
                            alt="thumbnail"
                            className="card-item-first img-fluid"
                            src={`${ImagePath}${movie.backdrop_path}`}
                        />
                    </Link>
                </div>

                <div className="col-md-9 align-self-center">
                    <section className="align-self-center text-decoration-non">
                        <h1 className="card-title" style={{fontSize: "200%"}}>{movie.title}</h1>
                        <p className="card-text text-dark">{movie.overview}</p>
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
