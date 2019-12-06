import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addReview} from "../../actions/movie";

const AddReview = ({auth, movie:{id, title, backdrop_path}, addReview}) => {
    const [review, setReview] = useState("");
    return (
        <Fragment>
        {
            !auth.loading && auth.isAuthenticated ? (
                <Fragment>
                    {
                        auth.user.userRole === 'Critic' ?
                            (
                                <div>
                                    <div className="form-group mb-1">
                                        <textarea
                                               rows="2"
                                               className="form-control"
                                               name={review}
                                               onChange={(e)=>
                                                   setReview(e.target.value)
                                        } />
                                    </div>
                                    <div className="form-group float-right mt-0 pt-0">
                                        <button type="button" className="btn btn-success"
                                                onClick={(e)=>
                                                    addReview(id, title, backdrop_path, review)}
                                        >
                                            Add Review
                                        </button>
                                    </div>
                                </div>
                            ):
                            <p>ab</p>
                    }

                </Fragment>
            ): (
                <p>Please login to comment</p>
            )
        }
        </Fragment>
    );
};

AddReview.propTypes = {
    auth: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    addReview: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    movie: state.movie.movie
});

export default connect(mapStateToProps, {addReview})(AddReview);
