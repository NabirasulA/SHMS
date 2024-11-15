import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/AppointmentCountsPage.css'; // Create and style this CSS as needed

function AppointmentCountsPage() {
  const { professional_id } = useParams(); // Capture the professional_id from the URL
  const [appointmentCounts, setAppointmentCounts] = useState([]);

  // Fetch the appointment count data for the specific professional
  useEffect(() => {
    if (professional_id) {
      axios
        .get(`http://localhost:8081/api/appointment-counts/${professional_id}`)
        .then((res) => {
          setAppointmentCounts([res.data]); // Wrap it in an array since you're rendering it as a table
        })
        .catch((err) => {
          console.error('Error fetching appointment count data:', err);
          alert('Failed to load appointment counts.');
        });
    }
  }, [professional_id]);
  
  

  return (
    <div className="appointment-counts-container">
      <h2>Appointment Counts for Healthcare Professional</h2>
      <div className="appointment-counts-table-container">
      <table className="appointment-counts-table">
  <thead>
    <tr>
      <th>Professional ID</th>
      <th>Healthcare Professional Name</th>
      <th>Appointment Count</th>
    </tr>
  </thead>
    <tbody>
        {appointmentCounts.length > 0 ? (
        appointmentCounts.map((record) => (
            <tr key={record.professional_id}>
            <td>{record.professional_id}</td>
            <td>{record.healthcare_professional_name}</td>
            <td>{record.appointment_count}</td>
            </tr>
        ))
        ) : (
        <tr>
            <td colSpan="3">No appointment data available for this professional.</td>
        </tr>
        )}
    </tbody>
    </table>
      </div>
    </div>
  );
}

export default AppointmentCountsPage;
