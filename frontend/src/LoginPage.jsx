import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/LoginPage.css'; // Make sure this file exists in the styles folder

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('patient'); // patient or professional
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8081/login', { email, password, userType });
            localStorage.setItem('user', JSON.stringify(response.data));
            if (userType === 'patient') {
                navigate('/book-appointment');
            } else {
                navigate('/healthcare-professional');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="login-input"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="login-input"
                />
                <select 
                    value={userType} 
                    onChange={(e) => setUserType(e.target.value)} 
                    className="login-select"
                >
                    <option value="patient">Patient</option>
                    <option value="professional">Healthcare Professional</option>
                </select>
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
}

export default LoginPage;
