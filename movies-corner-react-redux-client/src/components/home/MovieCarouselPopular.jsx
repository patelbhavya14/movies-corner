import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getPopularMovies} from "../../actions/home";
import MovieCarouselCard from "./MovieCarouselCard";
import {connect} from "react-redux";

const MovieCarouselPopular = ({getPopularMovies, movie}) => {
    useEffect(() => {
        getPopularMovies();
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
            <h1 className="p-2">Popular Movies</h1>
            <div className="container-fluid">
                <div className="m-3">
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
            </div>
        </div>
    );
};

MovieCarouselPopular.propTypes = {
    getPopularMovies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    movie: state.home
});

export default connect(mapStateToProps, {getPopularMovies})(MovieCarouselPopular);
