import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import {getTrailer} from "../../actions/movie";
import {connect} from 'react-redux';

const Trailer = ({movieId, getTrailer, movie:{trailer}}) => {
    useEffect(() => {
        getTrailer(movieId);
    }, [movieId]);

    const opts = {
        height: '270px',
        width: '380px',
    };

    return (
        <div className="border-light">
            <h2>Watch Trailer</h2>
            <YouTube videoId={trailer}
                     opts={opts}/>
        </div>
    );
};

Trailer.propTypes = {
    movieId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(mapStateToProps, {getTrailer})(Trailer);
