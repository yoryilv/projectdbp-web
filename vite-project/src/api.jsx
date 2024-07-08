import axios from "axios";

const API_URL = 'http://3.235.247.255:8080';

export const handleError = (error) => {
    if (error.response) {
        console.error('Error Response:', error.response.data);
        alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
        console.error('Error Request:', error.request);
        alert('Error: No se recibió respuesta del servidor.');
    } else {
        console.error('Error Message:', error.message);
        alert(`Error: ${error.message}`);
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token, userId } = response.data;
        return { token, userId };
    } catch (error) {
        handleError(error);
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const ListTasks = async (token, page = 0, size = 10) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            params: { page, size },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const CreateTask = async (token, task) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};