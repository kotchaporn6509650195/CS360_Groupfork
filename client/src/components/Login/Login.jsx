import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { AuthContext } from '../../AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
    

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/local`, { // Adjust the URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: username, // Use identifier for username or email
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            // Handle successful login
            console.log('Login successful:', data); // Log user data if needed
            navigate('/'); // Redirect to the home page or dashboard
            login({ username: data.user.username }); // Adjust according to your API response
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <div className="links">
                    <a href="/reset-password">Forgot Password?</a>
                    <span> | </span>
                    <a href="/register">Create an Account</a> {/* Note: Changed to lowercase 'register' */}
                </div>
            </form>
        </div>
    );
};

export default Login;