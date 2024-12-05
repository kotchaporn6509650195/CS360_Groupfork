import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Changepassword.scss';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // const validatePasswordLength = () => {
    //     if (newPassword.length < 8) {
    //         setMessage("New password must be at least 8 characters long.");
    //         return false;
    //     }
    //     return true;
    // };

    // const validatePassword = (newPassword) => {
    //     if (newPassword.length < 8) return 'Password must be at least 8 characters long';
    //     if (!/[A-Z]/.test(newPassword)) return 'Password must contain at least one uppercase letter';
    //     if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) return 'Password must contain at least one special character';
    //     if (!/\d/.test(newPassword)) return 'Password must contain at least one number';
    //     return '';
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        // const passwordValidationError = validatePassword(newPassword);
        // if (passwordValidationError) {
        //     setPasswordError(passwordValidationError);
        //     return;
        // }

        try {
            // ส่งคำขอเพื่อตรวจสอบ currentPassword กับฐานข้อมูล Strapi
            // const verifyResponse = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/check-password`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ password: currentPassword }),
            // });
            
            // const verifyData = await verifyResponse.json();

            // if (!verifyResponse.ok) {
            //     throw new Error(verifyData.error?.message || 'Current password is incorrect.');
            // }

            // ส่งคำขอเปลี่ยนรหัสผ่านเมื่อ currentPassword ถูกต้อง
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    password: newPassword,
                    passwordConfirmation: confirmPassword,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to change password.');
            }

            setMessage("Password changed successfully!");
            Swal.fire({
                icon: 'success',
                title: 'Password changed successfully!',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/');
            });

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Password change failed',
                text: error.message,
                confirmButtonText: 'Try Again',
            });
            setMessage(error.message);
        }
    };

    return (
        <div className='changepassword-container'>
            <h2>Change Password</h2>
            <form className='form-changepassword' onSubmit={handleSubmit}>
                <div>
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter Current Password"
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter New Password"
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Enter Confirm New Password"
                        required
                    />
                </div>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <button type="submit">Change Password</button>
                <div className="link">
                    <a href="/profile">Back to Profile</a>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
