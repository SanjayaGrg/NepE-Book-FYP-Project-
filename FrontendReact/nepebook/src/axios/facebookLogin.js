import axios from 'axios';

const facebookLogin = (accesstoken) => {
    console.log(accesstoken);
    axios
        .post('http://127.0.0.1:8000/auth/convert-token', {
            token: accesstoken,
            backend: 'facebook',
            grant_type: 'convert_token',
            client_id: 'CESNVcYk735wEZE087hYub34I3MppOAZtkn3QR6I',
            client_secret:
                'uq3L3DDTYnwB9RzfcPwWUWHJWWfzyemTiVnL8BC9GPuniRvuB2an3wedpmbHIUdzFScb8bPuMUKMcvbBHVYgJtc6iOW3ogQFIyXNtFSv2nYJYNVz7eqS9JqJ8Xe89Xj7',
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
        });
};

export default facebookLogin;