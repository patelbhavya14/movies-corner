import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isWatchList, addToWatchList, removeFromWatchList} from "../../actions/movie";
import ReactTooltip from 'react-tooltip'

const WatchListButton = ({movie:{id, title, backdrop_path}, isWatchList, isWatchlist, addToWatchList, removeFromWatchList, auth}) => {
    useEffect(() => {
        isWatchList(id);
    },[id]);

    return (
        <Fragment>
            {
                isWatchlist !== null && isWatchlist === "true"?
                    (
                        <Fragment>
                            <button className="btn btn-danger w-100 mt-2"
                                 onClick={(e) => removeFromWatchList(id, title, backdrop_path)}
                            >
                                <i className="fas fa-check" />&nbsp;
                                ADDED TO WATCHLIST
                            </button>

                            <ReactTooltip place="bottom" type="success" effect="float"/>
                        </Fragment>
                    ):
                    (<button className="btn btn-success w-100 mt-2"
                        onClick={(e) => addToWatchList(id, title, backdrop_path)}
                    >
                            <i className="fas fa-bookmark" />&nbsp;
                            ADD TO WATCHLIST
                        </button>
                        )
            }
        </Fragment>
    );
};

WatchListButton.propTypes = {
    isWatchList: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired,
    addToWatchList: PropTypes.func.isRequired,
    removeFromWatchList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    isWatchlist: state.movie.isWatchlist,
    auth: state.auth
});

export default connect(mapStateToProps, {isWatchList, addToWatchList, removeFromWatchList})(WatchListButton);
