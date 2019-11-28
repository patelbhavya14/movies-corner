import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPopularMovies, getNowPlayingMovies} from "../../actions/home";
import MoviePosterCard from "./MoviePosterCard";

const Movies = ({type, movie, getPopularMovies, getNowPlayingMovies}) => {
    useEffect(() => {
        if(type === 'Popular Movies')
            getPopularMovies();
        else
            getNowPlayingMovies();
    }, [type]);

    return (
        <div className="container">
            {
                type === 'Popular Movies' && movie && !movie.loadingpopularMovies && (
                    <Fragment>
                        <h1>{type}</h1>
                        <div className="row">
                            {
                                movie.popularMovies.map((m, index) =>
                                    (<MoviePosterCard movie={m} />)
                                )
                            }
                        </div>
                    </Fragment>

                )
            }

            {
                type === 'Now Playing Movies' && movie && !movie.loadingnowplayingMovies && (
                    <Fragment>
                        <h1>{type}</h1>
                        <div className="row">
                            {
                                movie.nowplayingMovies.map((m, index) =>
                                    (<MoviePosterCard movie={m} />)
                                )
                            }
                        </div>
                    </Fragment>
                )
            }

        </div>
    );
};

Movies.propTypes = {
    type: PropTypes.string.isRequired,
    getPopularMovies: PropTypes.func.isRequired,
    getNowPlayingMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.home
});

export default connect(mapStateToProps, {getPopularMovies, getNowPlayingMovies})(Movies);
