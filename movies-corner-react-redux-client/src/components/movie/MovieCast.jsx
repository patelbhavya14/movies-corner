import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getMovieCast} from "../../actions/movie";
import MovieCastCard from "./MovieCastCard";

const MovieCast = ({getMovieCast, movieId, movie:{cast}}) => {
    useEffect(() => {
        getMovieCast(movieId);
    }, [getMovieCast, movieId]);

    return (
        <Fragment>
            {
                cast && cast.map((c) =>
                    (
                        <MovieCastCard key={c.id}
                                       name={c.name}
                                       character={c.character}
                                       image={c.profile_path}
                        />
                    )
                )
            }
        </Fragment>
    );
};

MovieCast.propTypes = {
    getMovieCast: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    movie: state.movie
});

export default connect(mapStateToProps, {getMovieCast})(MovieCast);
