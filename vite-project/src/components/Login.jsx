import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { login } from "../api";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login : setAuthToken} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            setAuthToken(response.token);
        } catch (error) {
            console.log('Login failed: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required />
            <br />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br/>
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;
