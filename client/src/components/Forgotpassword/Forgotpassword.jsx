import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Forgotpassword.scss'; 

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format';
};

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError('');
        setEmailError('');
        setSuccessMessage('');

        if (!email) {
            setError('Please fill in all required fields.');
            if (!email) setEmailError('Email is required');
            return;
        }

        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email})
            });
            
            const data = await response.json();
            if (!response.ok) {
                console.error(data);
                const errorMsg = data.error?.message || 'Invalid email';
                throw new Error(errorMsg);
            }
            setSuccessMessage('Send OTP to email');
            navigate('/reset-password');
        } catch (err) {
            setError(err.message);
        }
    };
    

  return (
    <div className="reset-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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

        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Send OTP to email</button>

        <div className="form-group">
          <a href="/login">Back to Login</a>
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;
