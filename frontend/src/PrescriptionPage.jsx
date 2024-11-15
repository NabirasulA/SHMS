import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/PrescriptionPage.css'; // Import external CSS for styling

function PrescriptionPage() {
  const { appointmentId } = useParams(); // Get the appointment ID from URL
  const [prescription, setPrescription] = useState(null); // State to store prescription data
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    // Fetch prescription data from backend when the component is mounted
    axios.get(`http://localhost:8081/prescription/${appointmentId}`)
      .then(response => {
        setPrescription(response.data); // Set prescription data to state
      })
      .catch(err => {
        console.error('Error fetching prescription:', err);
        setError('No prescription found for this appointment');
      });
  }, [appointmentId]); // This hook runs whenever appointmentId changes

  return (
    <div className="prescription-container">
      <h2 className="prescription-title">Prescription Details</h2>
      <p className="appointment-id">Appointment ID: {appointmentId}</p>

      {error && <p style={{ color: '#d32f2f', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', backgroundColor: '#ffebee', padding: '10px', borderRadius: '5px', border: '1px solid #d32f2f' }}>{error}</p>}

      {prescription ? (
        <div className="prescription-details">
          <p><strong>Medicine Name:</strong> {prescription.medicine_name}</p>
          <p><strong>Dosage:</strong> {prescription.dosage}</p>
          <p><strong>Date Issued:</strong> {prescription.date_issued}</p>
        </div>
      ) : (
        <p className="loading-message">Loading prescription...</p>
      )}
    </div>
  );
}

export default PrescriptionPage;
