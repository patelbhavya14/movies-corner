import React from 'react';
import notfound from './../../images/404.png';

const NotFound = props => {
    return (
        <div>
            <img src={notfound} alt="Not found" height="100%" width="100%"/>
        </div>
    );
};

NotFound.propTypes = {

};

export default NotFound;
