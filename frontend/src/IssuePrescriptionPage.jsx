import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/IssuePrescriptionPage.css'; // Import the CSS for styling

function IssuePrescriptionPage() {
  const { appointmentId } = useParams(); // Get the appointment ID from URL
  const [prescription, setPrescription] = useState({
    medicine_name: '',
    dosage: '',
    patient_id: '', // Add field for patient ID
    professional_id: '' // Add field for professional ID
  });

  const handleChange = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Post prescription data to backend with appointment ID
    axios.post(`http://localhost:8081/prescription/${appointmentId}`, prescription)
      .then(() => {
        alert('Prescription issued successfully');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="prescription-container">
      <h2>Issue Prescription for Appointment ID: {appointmentId}</h2>
      <form onSubmit={handleSubmit} className="prescription-form">
        <label className="form-label">
          Medicine Name:
          <input 
            type="text" 
            name="medicine_name" 
            value={prescription.medicine_name} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </label>
        <label className="form-label">
          Dosage:
          <input 
            type="text" 
            name="dosage" 
            value={prescription.dosage} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </label>
        <label className="form-label">
          Patient ID:
          <input 
            type="text" 
            name="patient_id" 
            value={prescription.patient_id} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </label>
        <label className="form-label">
          Professional ID:
          <input 
            type="text" 
            name="professional_id" 
            value={prescription.professional_id} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </label>
        <button type="submit" className="submit-btn">Submit Prescription</button>
      </form>
    </div>
  );
}

export default IssuePrescriptionPage;
