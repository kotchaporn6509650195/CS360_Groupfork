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

    // ฟังก์ชันสำหรับดึงข้อมูลโปรไฟล์ของผู้ใช้ที่เข้าสู่ระบบ
    const fetchUserProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data); // ตั้งค่าข้อมูลผู้ใช้
            setProfileImage(data.profileImage); // สมมติว่าข้อมูลโปรไฟล์มี URL รูปภาพ
            setDescription(data.description); // ตั้งค่าคำอธิบายจากข้อมูลผู้ใช้
        } catch (error) {
            setError(error.message);
            console.error('Error fetching user profile:', error);
        }
    };

    // ฟังก์ชันสำหรับอัปโหลดรูปภาพ
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

    // ฟังก์ชันสำหรับบันทึกคำอธิบายเพิ่มเติม
    const handleDescriptionSave = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/api/users/me`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description }), // ส่งคำอธิบายเพิ่มเติมที่แก้ไขไปยังเซิร์ฟเวอร์
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setUser(data);
            setIsEditing(false); // ออกจากโหมดแก้ไข
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
                <FaUserCircle className='profile-picture' onClick={() => navigate("/profile")}/>
                {profileImage && <img src={profileImage} alt="Profile" className="profile-image" />}
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <h3>username: {user.username}</h3>
                <h4>email: {user.email}</h4>

                {/* ส่วนคำอธิบายเพิ่มเติม */}
                <div className="description-section">
                    <h4>description:</h4>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                cols="50"
                            />
                            <button className="btn-save" onClick={handleDescriptionSave}>save</button>
                            <button className="btn-cancel" onClick={() => setIsEditing(false)}>cancel</button>
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
