import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isWatchList, addToWatchList, removeFromWatchList} from "../../actions/movie";

const WatchListButton = ({movie:{id, title, backdrop_path}, isWatchList, isWatchlist, addToWatchList, removeFromWatchList}) => {
    useEffect(() => {
        isWatchList(id);
    },[id]);

    return (
        <Fragment>
            {
                isWatchlist !== null && isWatchlist === "true"?
                    (<i className="fas fa-bookmark btn btn-danger"
                             onClick={(e) => removeFromWatchList(id, title, backdrop_path)}
                        />
                        ):
                    (<i className="fas fa-bookmark btn btn-success"
                        onClick={(e) => addToWatchList(id, title, backdrop_path)}
                    />
                        )
            }
        </Fragment>
    );
};

WatchListButton.propTypes = {
    isWatchList: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired,
    addToWatchList: PropTypes.func.isRequired,
    removeFromWatchList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isWatchlist: state.movie.isWatchlist
});

export default connect(mapStateToProps, {isWatchList, addToWatchList, removeFromWatchList})(WatchListButton);
