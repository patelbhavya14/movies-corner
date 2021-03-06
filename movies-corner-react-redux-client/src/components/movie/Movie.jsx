import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {APIKey, ImagePath} from "../../config/config";
import {connect} from 'react-redux';
import MovieDetails from "./MovieDetails";
import {getMovieDetails} from "../../actions/movie";
import YouTube from 'react-youtube';
import Trailer from "./Trailer";
import MovieCast from "./MovieCast";
import WatchListButton from "./WatchListButton";
import Ratings from "./Ratings";
import MovieReviews from "./MovieReviews";

const Movie = ({movieId, movie: {movie, movieLoading}, getMovieDetails}) => {
    useEffect(() => {
        getMovieDetails(movieId);
    }, [movieId]);

    return (
        <div className="container-fluid m-0 p-0 mx-auto">
            {movieLoading ? (
                "loading"
            ) : (
                <div style={
                    {
                        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url("+ImagePath+movie.backdrop_path+")",
                        backgroundSize: "100%",
                        boxShadow: "inset 0 0 0 1000px rgba(0,0,0,.2)",
                        backgroundRepeat: "repeat-y"
                    }
                }>
                    <div className="container pt-5 pb-5 min-vh-100">
                        <div className="row">
                            <div className="col-md-3 col-sm-12 pr-3">
                                <img src={`${ImagePath}${movie.poster_path}`} alt={movie.title} style={{
                                    height: "auto",
                                    width: "100%"
                                }}/>
                                <br/>
                                <WatchListButton movie={movie}/>
                            </div>
                            <div className="col-md-5 col-sm-12 text-light">
                                <MovieDetails movie={movie}/>
                            </div>
                            <div className="col-md-4 col-sm-12 text-light">
                                <Trailer movieId={movieId}/>
                            </div>
                        </div>
                        <div className="row mt-3 text-light">
                            <h1 className="ml-3" style={{
                                "fontSize": "200%"
                            }}>Cast</h1>
                        </div>
                        <div className="row text-center">
                            <MovieCast movieId={movieId}/>
                        </div>
                        <div className="row mt-3 text-light">
                            <h1 className="ml-3" style={{
                                "fontSize": "200%"
                            }}>Reviews</h1>
                        </div>
                        <div className="row">
                            <MovieReviews movieId={movieId}/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Movie.propTypes = {
    movie: PropTypes.object.isRequired,
    getMovieDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   movie: state.movie
});

export default connect(mapStateToProps, {getMovieDetails})(Movie);
