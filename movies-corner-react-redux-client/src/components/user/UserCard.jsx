import React from 'react';
import logo from '../../images/logo.png'
import PropTypes from 'prop-types';

const UserCard = ({user, type}) => {
    return (
        <div className="card card-horizontal ml-5 mr-5 bg-transparent">

            <div className="card-row text-decoration-none bg-dark">

                {/*<div className="col-md-3 p-0">*/}
                {/*        <img*/}
                {/*            alt="thumbnail"*/}
                {/*            className="card-item-first img-fluid"*/}
                {/*            src={logo}*/}
                {/*            height*/}
                {/*        />*/}
                {/*</div>*/}

                <div className="col-md-9 align-self-center">
                    <section className="align-self-center text-decoration-none">
                        <h1 className="card-title text-light" style={{fontSize: "200%"}}>{user.userName}</h1>
                        <p className="card-text text-light m-0">{user.firstName}</p>
                        <p className="card-text text-light m-0">{user.userRole}</p>
                    </section>
                </div>

                <div className="col-md-3 align-self-center">
                    {
                        type === 'followings' &&
                        <button className="btn btn-danger">
                            <i className="fas fa-user-minus" /> &nbsp;Unfollow
                        </button>
                    }

                    {
                        type === 'followers' &&
                        <button className="btn btn-danger">
                            <i className="fas fa-user-plus" /> &nbsp;Follow
                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export default UserCard;
