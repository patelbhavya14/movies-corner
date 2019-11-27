import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {searchUsers} from "../../actions/search";
import UserCard from "../user/UserCard";

const SearchUsers = ({userName, searchUsers, search}) => {
    useEffect(() => {
        searchUsers(userName);
    }, [userName]);
    return (
        <div className="container">
            {!search.loading ? (
                <Fragment>
                    <h1 className='font-italic'>{`Search results for "${userName}"...`}</h1>
                    <Fragment>
                    {
                        search.users.map((user) =>
                            <UserCard user={user} />)
                    }
                    </Fragment>
                </Fragment>
            ):("loading")

            }
        </div>
    );
};

SearchUsers.propTypes = {
    userName: PropTypes.string.isRequired

};

const mapStateToProps = (state) => ({
    search: state.search
});

export default connect(mapStateToProps, {searchUsers})(SearchUsers);
