import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/ConfirmedAppointments.css'; // Import the CSS file

function ConfirmedAppointments() {
  const { professionalId } = useParams();  // Extract professionalId from the URL params
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);

  useEffect(() => {
    if (professionalId) { // Check if professionalId is available
      axios
        .get(`http://localhost:8081/api/confirmed-appointments/${professionalId}`)
        .then((res) => {
          setConfirmedAppointments(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [professionalId]);

  return (
    <div className="confirmedAppointments-container">
      <h2 className="confirmedAppointments-header">Confirmed Appointments</h2>
      <table className="confirmedAppointments-table">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {confirmedAppointments.map((appointment) => (
            <tr key={appointment.patient_id}>
              <td>{appointment.patient_id}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConfirmedAppointments;
