import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/HealthcareProfessionalPage.css'; // Import the CSS for styling

function HealthcareProfessionalPage() {
  const [appointments, setAppointments] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [avgFeedback, setAvgFeedback] = useState(null); // State to store average feedback score
  const navigate = useNavigate();

  // Fetch logged-in healthcare professional details
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user')); // Get current user details
    if (currentUser) {
      setProfessional(currentUser);
      fetchAppointments(currentUser.professional_id);
      fetchAverageFeedback(currentUser.professional_id); // Fetch average feedback
    }
  }, []);

  // Fetch appointments for the logged-in professional
  const fetchAppointments = (professionalId) => {
    axios
      .get(`http://localhost:8081/appointments/${professionalId}`)
      .then((res) => {
        setAppointments(res.data); // Set appointments based on professional_id
      })
      .catch((err) => console.log(err));
  };

 // Fetch average feedback for the logged-in professional
const fetchAverageFeedback = (professionalId) => {
  axios
    .get(`http://localhost:8081/api/average-feedback/${professionalId}`) // Use the actual professionalId here
    .then((res) => {
      setAvgFeedback(res.data.avg_feedback); // Set the average feedback score
    })
    .catch((err) => {
      console.log('Error fetching average feedback:', err);
    });
};


  // Update appointment status
  const handleUpdateStatus = (appointmentId, status) => {
    axios
      .post(`http://localhost:8081/appointments/${appointmentId}/${status.toLowerCase()}`)
      .then((res) => {
        alert(`Appointment status updated to ${status}`);
        fetchAppointments(professional.professional_id);
      })
      .catch((err) => {
        console.error('Error updating appointment status:', err);
        alert('Failed to update appointment status.');
      });
  };

  // Delete the appointment
  const handleDeleteAppointment = (appointmentId) => {
    axios
      .delete(`http://localhost:8081/appointments/${appointmentId}`)
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.Appointment_id !== appointmentId)
        );
        alert("Appointment deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting appointment:", err);
        alert("Failed to delete appointment.");
      });
  };

  // Navigate to the prescription page
  const handleIssuePrescription = (appointmentId) => {
    navigate(`/issue-prescription/${appointmentId}`);
  };

  // Navigate to view feedback
  const handleViewFeedback = (appointmentId) => {
    navigate(`/view-feedback/${appointmentId}`);
  };

  return (
    <div className="healthcare-professional-container">
      {professional && (
        <>
          <h2>Welcome, {professional.name}!</h2>

          {/* Display the Average Feedback */}
          <div className="average-feedback-container">
            <h4>Average Feedback: {avgFeedback !== null ? avgFeedback : 'Loading...'}</h4>
          </div>

          {/* Links for Appointment Counts, Confirmed Appointments, and Upcoming Appointments */}
          <Link
            to={`/appointment-counts/${professional.professional_id}`}
            className="appointment-counts-link"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '5px',
              textAlign: 'center',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'scale(1)';
            }}
          >
            View Appointment Counts
          </Link>

          <Link
            to={`/confirmed-appointments/${professional.professional_id}`}
            className="confirmed-appointments-link"
            style={{
              display: 'inline-block',
              margin: '10px',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '5px',
              textAlign: 'center',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'scale(1)';
            }}
          >
            View Confirmed Appointments
          </Link>

          <Link
            to={`/upcoming-appointments/professional/${professional.professional_id}`}
            className="upcoming-appointments-link"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '5px',
              textAlign: 'center',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'scale(1)';
            }}
          >
            View Upcoming Appointments
          </Link>

          <h3>Your Appointments</h3>
          <div className="appointments-table-container">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Appointment ID</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Patient ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.Appointment_id}>
                    <td>{appointment.Appointment_id}</td>
                    <td>{appointment.appointment_date}</td>
                    <td>{appointment.appointment_time}</td>
                    <td>{appointment.status}</td>
                    <td>{appointment.patient_id}</td>
                    <td>
                      {appointment.status.toLowerCase() === 'pending' ? (
                        <div className="action-buttons">
                          <button
                            className="action-btn confirm-btn"
                            onClick={() => handleUpdateStatus(appointment.Appointment_id, 'Confirmed')}
                          >
                            Confirm
                          </button>
                          <button
                            className="action-btn cancel-btn"
                            onClick={() => handleUpdateStatus(appointment.Appointment_id, 'Cancelled')}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <button
                            className="action-btn prescription-btn"
                            onClick={() => handleIssuePrescription(appointment.Appointment_id)}
                            disabled={appointment.status.toLowerCase() !== 'confirmed'}
                          >
                            Issue Prescription
                          </button>
                          <button
                            className="action-btn feedback-btn"
                            onClick={() => handleViewFeedback(appointment.Appointment_id)}
                            disabled={appointment.status.toLowerCase() !== 'confirmed'}
                          >
                            View Feedback
                          </button>
                        </>
                      )}
                      {appointment.status.toLowerCase() === 'cancelled' && (
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteAppointment(appointment.Appointment_id)}
                        >
                          Delete Appointment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default HealthcareProfessionalPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import './styles/HealthcareProfessionalPage.css'; // Import the CSS for styling

// function HealthcareProfessionalPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [professional, setProfessional] = useState(null);
//   const navigate = useNavigate();

//   // Fetch logged-in healthcare professional details
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('user')); // Get current user details
//     if (currentUser) {
//       setProfessional(currentUser);
//       fetchAppointments(currentUser.professional_id);
//     }
//   }, []);

//   // Fetch appointments for the logged-in professional
//   const fetchAppointments = (professionalId) => {
//     axios
//       .get(`http://localhost:8081/appointments/${professionalId}`)
//       .then((res) => {
//         setAppointments(res.data); // Set appointments based on professional_id
//       })
//       .catch((err) => console.log(err));
//   };

//   // Update appointment status
//   const handleUpdateStatus = (appointmentId, status) => {
//     axios
//       .post(`http://localhost:8081/appointments/${appointmentId}/${status.toLowerCase()}`)
//       .then((res) => {
//         alert(`Appointment status updated to ${status}`);
//         fetchAppointments(professional.professional_id);
//       })
//       .catch((err) => {
//         console.error('Error updating appointment status:', err);
//         alert('Failed to update appointment status.');
//       });
//   };

//   // Delete the appointment
//   const handleDeleteAppointment = (appointmentId) => {
//     axios
//       .delete(`http://localhost:8081/appointments/${appointmentId}`)
//       .then(() => {
//         setAppointments((prevAppointments) =>
//           prevAppointments.filter((appointment) => appointment.Appointment_id !== appointmentId)
//         );
//         alert("Appointment deleted successfully");
//       })
//       .catch((err) => {
//         console.error("Error deleting appointment:", err);
//         alert("Failed to delete appointment.");
//       });
//   };

//   // Navigate to the prescription page
//   const handleIssuePrescription = (appointmentId) => {
//     navigate(`/issue-prescription/${appointmentId}`);
//   };

//   // Navigate to view feedback
//   const handleViewFeedback = (appointmentId) => {
//     navigate(`/view-feedback/${appointmentId}`);
//   };

//   return (
//     <div className="healthcare-professional-container">
//       {professional && (
//         <>
//           <h2>Welcome, {professional.name}!</h2>

//           {/* Links for Appointment Counts, Confirmed Appointments, and Upcoming Appointments */}
//           <Link
//             to={`/appointment-counts/${professional.professional_id}`}
//             className="appointment-counts-link"
//             style={{
//               display: 'inline-block',
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: '#fff',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               textDecoration: 'none',
//               borderRadius: '5px',
//               textAlign: 'center',
//               transition: 'background-color 0.3s ease, transform 0.2s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#45a049';
//               e.target.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#4CAF50';
//               e.target.style.transform = 'scale(1)';
//             }}
//           >
//             View Appointment Counts
//           </Link>

//           <Link
//             to={`/confirmed-appointments/${professional.professional_id}`}
//             className="confirmed-appointments-link"
//             style={{
//               display: 'inline-block',
//               margin: '10px',
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: '#fff',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               textDecoration: 'none',
//               borderRadius: '5px',
//               textAlign: 'center',
//               transition: 'background-color 0.3s ease, transform 0.2s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#45a049';
//               e.target.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#4CAF50';
//               e.target.style.transform = 'scale(1)';
//             }}
//           >
//             View Confirmed Appointments
//           </Link>

//           <Link
//             to={`/upcoming-appointments/professional/${professional.professional_id}`}
//             className="upcoming-appointments-link"
//             style={{
//               display: 'inline-block',
//               padding: '10px 20px',
//               backgroundColor: '#4CAF50',
//               color: '#fff',
//               fontSize: '16px',
//               fontWeight: 'bold',
//               textDecoration: 'none',
//               borderRadius: '5px',
//               textAlign: 'center',
//               transition: 'background-color 0.3s ease, transform 0.2s ease',
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#45a049';
//               e.target.style.transform = 'scale(1.05)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#4CAF50';
//               e.target.style.transform = 'scale(1)';
//             }}
//           >
//             View Upcoming Appointments
//           </Link>

//           <h3>Your Appointments</h3>
//           <div className="appointments-table-container">
//             <table className="appointments-table">
//               <thead>
//                 <tr>
//                   <th>Appointment ID</th>
//                   <th>Date</th>
//                   <th>Time</th>
//                   <th>Status</th>
//                   <th>Patient ID</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.map((appointment) => (
//                   <tr key={appointment.Appointment_id}>
//                     <td>{appointment.Appointment_id}</td>
//                     <td>{appointment.appointment_date}</td>
//                     <td>{appointment.appointment_time}</td>
//                     <td>{appointment.status}</td>
//                     <td>{appointment.patient_id}</td>
//                     <td>
//                       {appointment.status.toLowerCase() === 'pending' ? (
//                         <div className="action-buttons">
//                           <button
//                             className="action-btn confirm-btn"
//                             onClick={() => handleUpdateStatus(appointment.Appointment_id, 'Confirmed')}
//                           >
//                             Confirm
//                           </button>
//                           <button
//                             className="action-btn cancel-btn"
//                             onClick={() => handleUpdateStatus(appointment.Appointment_id, 'Cancelled')}
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <button
//                             className="action-btn prescription-btn"
//                             onClick={() => handleIssuePrescription(appointment.Appointment_id)}
//                             disabled={appointment.status.toLowerCase() !== 'confirmed'}
//                           >
//                             Issue Prescription
//                           </button>
//                           <button
//                             className="action-btn feedback-btn"
//                             onClick={() => handleViewFeedback(appointment.Appointment_id)}
//                             disabled={appointment.status.toLowerCase() !== 'confirmed'}
//                           >
//                             View Feedback
//                           </button>
//                         </>
//                       )}
//                       {appointment.status.toLowerCase() === 'cancelled' && (
//                         <button
//                           className="action-btn delete-btn"
//                           onClick={() => handleDeleteAppointment(appointment.Appointment_id)}
//                         >
//                           Delete Appointment
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default HealthcareProfessionalPage;




