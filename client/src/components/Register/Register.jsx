import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
            // แสดง Pop-up แจ้งเตือนเมื่อการลงทะเบียนสำเร็จ
            Swal.fire({
                icon: 'success',
                title: 'Successfully Registered!',
                text: 'Ready to Login to use the web application.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login');
            });           
        } catch (err) {
             // แสดง Pop-up เมื่อเกิดข้อผิดพลาด
             Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: err.message,
                confirmButtonText: 'Try Again'
            });
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
                        placeholder="Enter Username"
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
                        placeholder="Enter Gmail (Ex.xxx@gmail.com)"
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
                        placeholder="Enter Psassword"
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
                        placeholder="Confirm Password"
                        required
                    />
                    {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                </div>

                {error && <p className="error">{error}</p>}
                <button type="submit">Register</button>
                
                <div className="links">
                    <a href="/login">Back to Login</a>
                </div>
            </form>
        </div>
    );
};

export default Register;