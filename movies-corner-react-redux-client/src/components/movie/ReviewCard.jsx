import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import Avatar from "react-avatar";
import {connect} from "react-redux";

const ReviewCard = ({review, auth}) => {
    return (
        <Fragment>
        {
            !auth.loading && (
                <div className="card rounded mb-1 m-2 p-3 pl-0">
                    <div className="card-row text-decoration-none" style={{
                        background: "white"
                    }}>
                        <div className="col-md-4 p-0 float-left">
                            <Avatar name={`${review.user.firstName} ${review.user.lastName}`} round={true}/>

                        </div>
                        <div className="col-md-8 p-0 text-dark">
                            <h2>{review.user.firstName} {review.user.lastName}</h2>
                            {review.review}
                        </div>

                    </div>
                </div>
            )
        }
        </Fragment>

    );
};

ReviewCard.propTypes = {
    review: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, {})(ReviewCard);
