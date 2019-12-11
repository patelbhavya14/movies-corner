import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";
import Movies from "../home/Movies";
import {withRouter} from  "react-router-dom";
import MovieCarousel from "../home/MovieCarouselPopular";
import MovieCarouselPoster from "../home/MovieCarouselNowPlaying";

const HomePage = props => {
    props.history.listen(location => console.log(location));

    return (
        <div>
            <SearchBar/>
            <MovieCarousel />
            <MovieCarouselPoster />
            {/*<Movies type="Popular Movies"/>*/}
            {/*<Movies type="Now Playing Movies"/>*/}
        </div>
    );
};

HomePage.propTypes = {

};

export default HomePage;
