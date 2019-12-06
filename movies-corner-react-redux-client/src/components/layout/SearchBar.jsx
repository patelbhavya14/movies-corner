import React, {useState} from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const SearchBar = ({searchUsers}) => {
    const [searchData, setSearchData] = useState({
        searchType: "Movie",
        searchQuery: "",
        searchButton: true
    });

    const {searchType, searchQuery, searchButton} = searchData;

    const setSearchQuery = (e) => {
        let button;
        if(e.target.value === "") {
            button = true;
        } else {
            button = false;
        }

        setSearchData({
            ...searchData,
            searchQuery: e.target.value,
            searchButton: button
        })
    };

    return (
        <div className="form-group">
            <div className="input-group shadow-sm">
                <span className="input-group-prepend input-group-item input-group-item-shrink">
                    <select
                        className="form-control bg-white"
                        name="searchType"
                        value={searchType}
                        onChange={(e) => setSearchData({
                            ...searchData,
                            searchType: e.target.value
                        })}
                    >
                        <option value="Movie">Movie</option>
                        <option value="User">User</option>
                    </select>
                </span>
                <div className="input-group-append input-group-item">
                    <input aria-label="Text input with checkbox" className="form-control bg-white" type="text"
                           name="searchValue" value={searchQuery}
                    onChange={setSearchQuery}/>
                </div>
                <span className="input-group-append input-group-item input-group-item-shrink">
                    {
                        searchType === 'User'? (
                            <Link to={`/search/user/${searchQuery}`}>
                                <input type="submit" className="btn btn-success" type="button" value="Search"
                                       disabled={searchButton} />
                            </Link>
                        ): (
                            <Link to={`/search/movie/${searchQuery}`}>
                                <input type="submit" className="btn btn-success" type="button" value="Search"
                                       disabled={searchButton} />
                            </Link>
                        )
                    }
                </span>
            </div>
        </div>
    );
};

SearchBar.propTypes = {
};

export default SearchBar;
