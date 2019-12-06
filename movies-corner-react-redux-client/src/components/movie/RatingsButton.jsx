import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import Rating from "react-rating";
import {connect} from "react-redux";
import {getUserRatingForMovie, addRating, updateRating, deleteRating} from "../../actions/movie";

const RatingsButton = ({movie: {ratings, movie:{id, title, backdrop_path}},
                           movieId, getUserRatingForMovie, addRating, updateRating, deleteRating}) => {
    useEffect(() => {
        getUserRatingForMovie(movieId);
    }, [movieId]);

    return (
        <Fragment>
            {
                !ratings.userRatingLoading && (
                    <div>
                        {ratings.ratingAction === "update" &&
                            (
                                <span>
                                    <i className="fas fa-times-circle btn text-danger d-inline-block p-0 pr-2" onClick={
                                    (e) => deleteRating(id, title, backdrop_path)
                                }/>
                                </span>
                            )
                        }
                        <Rating
                            emptySymbol="far fa-star"
                            fullSymbol="fas fa-star text-warning"
                            initialRating={ratings.userRating}
                            stop={10}
                            onChange={ratings.ratingAction === "update"?
                                (rating) => updateRating(id, title, backdrop_path, rating):
                                (rating) => addRating(id, title, backdrop_path, rating)}
                        />

                    </div>
                )
            }

        </Fragment>

    );
};

RatingsButton.propTypes = {
    movieId: PropTypes.string.isRequired,
    getUserRatingForMovie: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    updateRating: PropTypes.func.isRequired,
    deleteRating: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(mapStateToProps, {getUserRatingForMovie, addRating, updateRating, deleteRating})(RatingsButton);
