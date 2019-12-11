import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addReview} from "../../actions/movie";
import Avatar from "react-avatar";

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
                                <div className="form-group">
                                    <div className="input-group shadow-sm">
                                            <span className="input-group-prepend input-group-item input-group-item-shrink p-2">
                                                <Link to={`/profile/${auth.user.userId}`}>
                                                    <Avatar name={`${auth.user.firstName} ${auth.user.lastName}`} round={true}/>
                                                </Link>
                                            </span>
                                        <div className="input-group-append input-group-item h-100">
                                            <textarea
                                                className="form-control"
                                                name={review}
                                                placeholder="Add reviews here"
                                                onChange={(e)=>
                                                    setReview(e.target.value)
                                                } />
                                        </div>
                                        <span className="input-group-append input-group-item input-group-item-shrink">
                                            <button type="button" className="btn btn-success h-100"
                                                    onClick={(e)=>
                                                        addReview(id, title, backdrop_path, review)}
                                            >
                                                <i className="fas fa-comments"/> <br/>
                                                Add Review
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            ):
                            <p>You need to be a certified Critic</p>
                    }

                </Fragment>
            ): (
                <p>Please <Link to="/login" className="text-light"><u>Login</u></Link> to comment</p>
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
