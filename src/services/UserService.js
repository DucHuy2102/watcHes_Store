import axios from 'axios';

// login
export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data);
    return res.data;
};

// register
export const registerUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
    return res.data;
};
