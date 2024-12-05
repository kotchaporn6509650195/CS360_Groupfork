import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import './Profile.scss';

const Profile = () => {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    // Function to fetch the logged-in user's profile data
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error fetching profile: ${errorData.message || 'Unknown error'}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
            setProfileImage(data.profileImage);
            setDescription(data.description || '');
        } catch (error) {
            setError(error.message);
            console.error('Error fetching user profile:', error);
        }
    };

    // Function to handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/users/upload`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
            setProfileImage(data.profileImage);
        } catch (error) {
            setError(error.message);
            console.error('Error uploading image:', error);
        }
    };

    // Function to save additional description
    const handleDescriptionSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/users/me`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }), // Send the edited description to the server
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(`Error saving description: ${errorData.message || 'Unknown error'}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            setError(error.message);
            console.error('Error saving description:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (error) {
        return <p>Error fetching profile: {error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-details">
                <FaUserCircle className='profile-picture' onClick={() => navigate("/profile")} />
                {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <h3>Username: {user.username}</h3>
                <h4>Email: {user.email}</h4>

                {/* Description section */}
                <div className="description-section">
                    <h4>Description:</h4>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                cols="50"
                            />
                            <button className="btn-save" onClick={handleDescriptionSave}>Save</button>
                            <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <p>{description || 'ยังไม่มีคำอธิบายเพิ่มเติม'}</p>
                            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit</button>
                        </div>
                    )}

                    <button className="btn-change-password" onClick={() => navigate("/change-password")}>Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
