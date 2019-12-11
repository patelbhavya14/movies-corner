import React, {useState} from 'react';
import PropTypes from 'prop-types';

const UpdateModal = ({modal}) => {
    const[showModal, setShowModal] = (modal);
    return (
        <div>
            {
                showModal && (
                    <div
                        aria-labelledby="claySmallModalLabel"
                        className="fade modal"
                        id="claySmallModal"
                        role="dialog"
                        tabIndex="-1"
                        aria-hidden="true"
                    >
                    </div>
                )
            }

        </div>
    );
};

UpdateModal.propTypes = {

};

export default UpdateModal;
