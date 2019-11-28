import React from 'react';
import PropTypes from 'prop-types';
import {ImagePath} from "../../config/config";

const MovieCastCard = ({name, character, image}) => {
    return (
        <div className="col-lg-3 col-md-2 col-sm-6 d-flex align-items-stretch">
            <div className="card m-3">
                <img
                    alt="thumbnail"
                    className="card-img-top"
                    src={`${ImagePath}${image}`}
                />
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-subtitle">{character}</p>
                </div>
            </div>
        </div>
    );
};

MovieCastCard.propTypes = {
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default MovieCastCard;
