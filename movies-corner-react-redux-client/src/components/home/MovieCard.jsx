import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ImagePath} from "../../config/config";
import {Link} from "react-router-dom";

const MovieCard = ({movie, type}) => {
    useEffect(() => {
        if(type === "search")
            setImage(`${ImagePath}`+`${movie.backdrop_path}`);
        else
            setImage(`${ImagePath}`+`${movie.movieImage}`);
    },[]);
    const [image, setImage] = useState('');


    return (
        <div className="card card-horizontal ml-5 mr-5 rounded mb-1 m-2">

            <div className="card-row text-decoration-none">

                <div className="col-md-3 p-0">
                    <Link to={type === 'search'? `/movie/${movie.id}`:`/movie/${movie.movieId}`}>
                        <img
                            alt="thumbnail"
                            className="card-item-first img-fluid"
                            src={image}
                        />
                    </Link>
                </div>

                <div className="col-md-9 align-self-center">
                    <section className="align-self-center text-decoration-non">
                        <h1 className="card-title" style={{fontSize: "200%"}}>
                            {type === 'search'? `${movie.title}`:`${movie.movieName}`}
                        </h1>
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
