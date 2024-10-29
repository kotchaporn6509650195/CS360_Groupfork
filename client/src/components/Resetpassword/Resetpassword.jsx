import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Resetpassword.scss'; 

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email format';
};

  const validatePassword = (newPassword) => {
    if (newPassword.length < 8) return 'new Password must be at least 8 characters long';
    if (!/[A-Z]/.test(newPassword)) return 'new Password must contain at least one uppercase letter';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) return 'new Password must contain at least one special character';
    if (!/\d/.test(newPassword)) return 'new Password must contain at least one number';
    return '';
};

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error messages
        setError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setSuccessMessage('');

        if (!code || !newPassword || !confirmPassword) {
            setError('Please fill in all required fields.');
            if (!email) setEmailError('Email is required');
            if (!newPassword) setPasswordError('Password is required');
            if (!confirmPassword) setConfirmPasswordError('Confirm password is required');
            return;
        }

        const emailValidationError = validateEmail(email);
        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        const passwordValidationError = validatePassword(newPassword);
        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match');
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, newPassword, confirmPassword})
            });
            
            const data = await response.json();
            if (!response.ok) {
                console.error(data);
                const errorMsg = data.error?.message || 'Failed to reset-password';
                throw new Error(errorMsg);
            }
            setSuccessMessage('รหัสผ่านถูกรีเซ็ตสำเร็จ!');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };
    

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
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

        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
           {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
          {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
        </div>

        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Reset Password</button>

        <div className="form-group">
          <a href="/login">Back to Login</a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
