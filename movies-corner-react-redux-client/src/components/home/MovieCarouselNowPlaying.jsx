import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getNowPlayingMovies} from "../../actions/home";
import MovieCarouselCard from "./MovieCarouselCard";
import Slider from "react-slick";
import {ImagePath} from "../../config/config";

const MovieCarouselNowPlaying = ({movie, getNowPlayingMovies}) => {
    useEffect(() => {
        getNowPlayingMovies();
    }, []);

    const settings = {
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true
    };
    return (
        <div>
            <h1 className="p-2">Now Playing Movies</h1>
            <Slider {...settings} className="m-0">
                {
                    movie && !movie.loadingpopularMovies && (
                        movie.popularMovies.map((m, i) =>
                            <MovieCarouselCard movie={m} key={i}/>
                        )
                    )
                }
            </Slider>
        </div>
    );
};

MovieCarouselNowPlaying.propTypes = {
    getNowPlayingMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.home
});

export default connect(mapStateToProps,{getNowPlayingMovies})(MovieCarouselNowPlaying);
