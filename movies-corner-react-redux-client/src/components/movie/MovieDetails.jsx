import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Moment from "react-moment";

const MovieDetails = ({movie: {title, overview, runtime, genres, release_date}}) => {
    return (
        <Fragment>
            <div className="row">
                    <h1 style={{"fontSize": "200%"}}>{title}</h1>
            </div>
            <div className="row">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <small>
                            {moment.duration(runtime, "minutes").format("h [hrs] m [min]")}
                        </small>
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">
                        {
                            genres.map(genre =>
                                (
                                    <span className="badge badge-success" key={genre.id}>
                                        {genre.name}
                                    </span>
                                )
                            )
                        }
                    </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item">
                        <small>
                            <Moment format="DD MMMM, YYYY">
                                {release_date}
                            </Moment>
                        </small>
                    </li>
                </ul>
            </div>
            <div className="row">
                <span className="justify-content-center">
                    {overview}
                </span>
            </div>
        </Fragment>
    );
};

MovieDetails.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieDetails;
