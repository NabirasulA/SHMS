import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterPage.css'; // Ensure this file exists in your styles folder

const RegisterPage = () => {
    const [role, setRole] = useState('patient');
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        specialization: '',
        healthcare_role: 'doctor',
        phone_no: '',
        email: '',
        qualification: '',
        password: '',
        street_number: '',
        apartment_number: '',
        street_name: '',
        city: '',
        state: '',
        postal_code: ''
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'roleSelect') {
            setRole(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/register', { role, ...formData })
            .then(response => {
                alert(response.data.message);
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
                alert('Registration failed.');
            });
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register as {role === 'patient' ? 'Patient' : 'Healthcare Professional'}</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Role:</label>
                    <select name="roleSelect" value={role} onChange={handleChange} className="form-control">
                        <option value="patient">Patient</option>
                        <option value="healthcare_professional">Healthcare Professional</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                </div>

                {role === 'patient' && (
                    <>
                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="form-control" required>
                                <option value="">Select</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Other</option>
                            </select>
                        </div>
                    </>
                )}

                {role === 'healthcare_professional' && (
                    <>
                        <div className="form-group">
                            <label>Specialization:</label>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Qualification:</label>
                            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Healthcare Role:</label>
                            <select name="healthcare_role" value={formData.healthcare_role} onChange={handleChange} className="form-control">
                                <option value="doctor">Doctor</option>
                                <option value="physiotherapist">Physiotherapist</option>
                                <option value="nutritionist">Nutritionist</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="form-group">
                    <label>Phone No:</label>
                    <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} className="form-control" required />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
                </div>

                {role === 'patient' && (
                    <>
                        <h3 className="section-title">Address Information</h3>
                        <div className="form-group">
                            <label>Street Number:</label>
                            <input type="text" name="street_number" value={formData.street_number} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Apartment Number:</label>
                            <input type="text" name="apartment_number" value={formData.apartment_number} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Street Name:</label>
                            <input type="text" name="street_name" value={formData.street_name} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>State:</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label>Postal Code:</label>
                            <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="form-control" required />
                        </div>
                    </>
                )}

                <button type="submit" className="submit-button">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
