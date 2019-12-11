import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getUserReviews, deleteReview} from "../../actions/profile";
import MovieCard from "../home/MovieCard";
import UpdateModal from "../layout/UpdateModal";
import Modal from 'react-modal';
import FollowButton from "./FollowButton";

const Reviews = ({userId, getUserReviews, profile: {reviews}, deleteReview}) => {
    useEffect(() => {
        getUserReviews(userId);
    },[userId]);

    const [modal, setModal] = useState(false);
    const onEdit = () => {
        setModal(true);
    };

    const dltReview = (review) => {
            deleteReview(review);
    };

    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    return (
        <div>
            <Modal
                isOpen={modal}
                contentLabel="Example Modal"
                onRequestClose={
                    (e)=>setModal(false)
                }
                style={customStyles}
            />
            {
                reviews !== [] && reviews.map((movie, index) =>
                    <MovieCard movie={movie} type='reviews' action={dltReview} onEdit={onEdit} key={index}/>
                )
            }
        </div>
    );
};

Reviews.propTypes = {
    userId: PropTypes.string.isRequired,
    getUserReviews: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getUserReviews, deleteReview})(Reviews);
