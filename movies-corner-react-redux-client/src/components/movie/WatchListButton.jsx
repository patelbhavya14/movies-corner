import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const WatchListButton = ({inWatchList}) => {
    return (
        <Fragment>
            {
                inWatchList === true?
                    (<button className="btn btn-danger btn-outline-light w-100"
                             // onClick={(e) => removeWatchList(movieId)}
                    >
                        <i className="fas fa-user-minus" />&nbsp; Remove from Watchlist
                    </button>):
                    (<button className="btn btn-success btn-outline-light w-100"
                             // onClick={(e) => addWatchList(movieId)}
                    >
                        <i className="fas fa-user-plus" />&nbsp; Add to Watchlist
                    </button>)
            }
        </Fragment>
    );
};

WatchListButton.propTypes = {

};

export default connect()(WatchListButton);
