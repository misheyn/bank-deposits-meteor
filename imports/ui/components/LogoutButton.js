import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Meteor.logout((error) => {
            if (error) {
                console.error('Logout error:', error);
            } else {
                navigate('/login');
            }
        });
    };

    return (
        <button className={"logout-button"} onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;