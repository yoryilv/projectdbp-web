import axios from "axios";
const API_URL = 'http://52.90.215.71:8080';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {email,password});
    return response.data;
};

export const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}/auth/register`, {name,email,password});
    return response.data;
};

export const ListTasks = async (token) => {
    const response = await axios.get(`${API_URL}/courses`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}