import React from 'react';
import './AdminHeader.css';

const AdminHeader = ({ onLogout }) => {
    return (
        <header className="admin-header">
            <h1 className="admin-title">Admin Dashboard</h1>
            <button onClick={onLogout} className="logout-button">Logout</button>
        </header>
    );
};

export default AdminHeader;