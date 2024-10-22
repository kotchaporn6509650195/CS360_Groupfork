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
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
            return 'Password must contain at least one special character';
        }
        return '';
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Invalid email format';
        }
        return '';
    };

    // Check username availability
    const checkUsername = async () => {
        if (!username) return; // Skip check if username is empty
        try {
            const response = await fetch(`http://localhost:1337/api/accounts?filters[username][$eq]=${username}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to check username');
            }

            if (data.data && data.data.length > 0) {
                setUsernameError('Username is already taken');
            } else {
                setUsernameError(''); // Clear error if the username is available
            }
        } catch (err) {
            setUsernameError(err.message);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error messages
        setError('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        // Check for empty fields
        if (!username) {
            setUsernameError('Username is required');
        }
        if (!email) {
            setEmailError('Email is required');
        }
        if (!password) {
            setPasswordError('Password is required');
        }
        if (!confirmPassword) {
            setPasswordError((prev) => prev ? prev : 'Confirm password is required');
        }

        // Return early if there are validation errors
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all required fields.');
            return;
        }

        // Check for validation errors
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
            return;
        }

        // Register the user
        try {
            const response = await fetch('http://localhost:1337/api/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        username,
                        email,
                        password,
                    },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to register');
            }

            // Redirect to login page or another page
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle onBlur for username check
    const handleUsernameBlur = () => {
        checkUsername(); // Call function to check username availability
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
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleUsernameBlur} // Validate username on blur
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
                        onBlur={() => setEmailError(validateEmail(email))} // Validate email on blur
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
                        onBlur={() => setPasswordError(validatePassword(password))} // Validate password on blur
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
                    />
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
