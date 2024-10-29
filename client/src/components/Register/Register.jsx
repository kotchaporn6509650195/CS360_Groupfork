import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigate = useNavigate();

    // Validation functions
    const validateUsername = (username) => {
        return username.length < 5 ? 'Username must be at least 5 characters long' : '';
    };

    const validatePassword = (password) => {
        if (password.length < 8) return 'Password must be at least 8 characters long';
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
        if (!/\d/.test(password)) return 'Password must contain at least one number';
        return '';
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format';

    // Handle username input change
    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value)); // Validate on change
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all required fields.');
            if (!username) setUsernameError('Username is required');
            if (!email) setEmailError('Email is required');
            if (!password) setPasswordError('Password is required');
            if (!confirmPassword) setConfirmPasswordError('Confirm password is required');
            return;
        }

        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        const passwordValidationError = validatePassword(password);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/local/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.error?.message || 'Failed to register';
                throw new Error(errorMsg);
            }

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        onBlur={() => setUsernameError(validateUsername(username))} // Validate on blur
                        required
                    />
                    {usernameError && <p className="error">{usernameError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailError(validateEmail(email))}
                        required
                    />
                    {emailError && <p className="error">{emailError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setPasswordError(validatePassword(password))}
                        required
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={() => {
                            if (password !== confirmPassword) {
                                setConfirmPasswordError('Passwords do not match');
                            } else {
                                setConfirmPasswordError('');
                            }
                        }}
                        required
                    />
                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;