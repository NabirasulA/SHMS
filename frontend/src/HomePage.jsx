import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to Smart Healthcare Management System</h1>
                <p>Manage your healthcare needs easily and efficiently!</p>
            </header>
            <div className="button-container">
                <Link to="/login">
                    <button className="primary-button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="secondary-button">Register</button>
                </Link>
                {/* <Link to="/query-dashboard">
                    <button className="query-dashboard-button">View Queries</button>
                </Link>
                <Link to="/procedures-dashboard">
                    <button className="primary-button">View Procedures Dashboard</button>
                </Link> */}
            </div>
        </div>
    );
}

export default HomePage;
