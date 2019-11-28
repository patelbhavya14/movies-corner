import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";
import Movies from "../movie/Movies";

const HomePage = props => {
    return (
        <div>
            <SearchBar/>
            <Movies type="Popular Movies"/>
            <Movies type="Now Playing Movies"/>
        </div>
    );
};

HomePage.propTypes = {

};

export default HomePage;
