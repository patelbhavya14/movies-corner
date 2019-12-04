import axios from 'axios';

export const setAuthToken = () => {
    if(localStorage.token) {
        const config = {
            headers: {
                'x-auth-token': "Bearer "+localStorage.token
            }
        };
        return config;
    }
};
