import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getPopularMovies} from "../../actions/home";
import {connect} from "react-redux";
import MoviePosterCard from "./MoviePosterCard";
import {APIKey, ImagePath} from "../../config/config";

const MovieCarousel = ({getPopularMovies, movie}) => {
    useEffect(() => {
        getPopularMovies();
    }, [getPopularMovies]);

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <Slider {...settings}>

            {


                movie && !movie.loadingpopularMovies && (
                        movie.popularMovies.map((m) =>
                            <p>{m.title}</p>
                        )

                )
            }

        </Slider>
    );
};

MovieCarousel.propTypes = {
    getPopularMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(mapStateToProps, {getPopularMovies})(MovieCarousel);
