import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {searchMovies} from "../../actions/search";
import ReactLoading from "react-loading";
import UserCard from "../user/UserCard";
import MovieCard from "../movie/MovieCard";

const SearchMovies = ({query, search, searchMovies}) => {
    useEffect(() => {
        searchMovies(query);
    }, [query]);

    return (
        <div className="container">
            {!search.loadingMovies?
                (
                    <Fragment>
                    <h1 className='font-italic'>{`Search results for "${query}"...`}</h1>
                        <Fragment>
                    {
                        search.movies.map((movie) =>
                            <MovieCard movie={movie} type='search'/>
                        )

                    }
                        </Fragment>
                    </Fragment>
                ):
                (<ReactLoading type='bars'/>) }
        </div>
    );
};

SearchMovies.propTypes = {
    searchMovies: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    search: state.search
});

export default connect(mapStateToProps, {searchMovies})(SearchMovies);
