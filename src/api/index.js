import axios from 'axios';

export const apiLogin = ({username, password}) => axios.post('/api/users/login', {username, password});
