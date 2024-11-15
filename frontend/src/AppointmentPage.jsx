import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/AppointmentPage.css'; // Import external CSS for styling

function AppointmentPage() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch the logged-in user from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fetch the appointments for the logged-in patient
  useEffect(() => {
    if (user && user.patient_id) {
      axios.get('http://localhost:8081/appointments', {
        params: { patient_id: user.patient_id }
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
    }
  }, [user]);

  // Filter for upcoming appointments
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    const currentDate = new Date();
    return appointmentDate > currentDate;
  });

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Your Appointments</h2>
       {/* Link to the UpcomingAppointmentsPatient page */}
       <Link
          to={`/upcoming-appointments/patient/${user?.patient_id}`} // Link to UpcomingAppointmentsPatient
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
          View Upcoming Appointments
        </Link>

        {/* Link to the RatingGreaterThan4 page */}
        <Link
          to="/rating-greater-than-4"
          className="appointment-counts-link"
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
          View Healthcare Professionals with Rating Greater Than 4
        </Link>
        


      {appointments.length > 0 ? (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Patient ID</th>
              <th>Professional ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const status = appointment.status.toLowerCase(); // Convert status to lowercase
              return (
                <tr key={appointment.Appointment_id}>
                  <td>{appointment.Appointment_id}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_time}</td>
                  <td className={`status ${status}`}>
                    {appointment.status}
                  </td>
                  <td>{appointment.patient_id}</td>
                  <td>{appointment.professional_id}</td>
                  <td className="actions">
                    {/* Conditionally render links based on appointment status */}
                    {status !== 'pending' && status !== 'cancelled' ? (
                      <>
                        <Link to={`/prescription/${appointment.Appointment_id}`} className="action-link">
                          View Prescription
                        </Link>
                        {' | '}
                        <Link to={`/give-feedback/${appointment.Appointment_id}`} className="action-link">
                          Give Feedback
                        </Link>
                      </>
                    ) : (
                      <span className="disabled-link">View Prescription | Give Feedback</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="no-appointments">No appointments found.</p>
      )}
    </div>
  );
}

export default AppointmentPage;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './styles/AppointmentPage.css'; // Import external CSS for styling

// function AppointmentPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [user, setUser] = useState(null);

//   // Fetch the logged-in user from localStorage
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('user'));
//     if (currentUser) {
//       setUser(currentUser);
//     }
//   }, []);

//   // Fetch the appointments for the logged-in patient
//   useEffect(() => {
//     if (user && user.patient_id) {
//       axios.get('http://localhost:8081/appointments', {
//         params: { patient_id: user.patient_id }
//       })
//       .then((res) => setAppointments(res.data))
//       .catch((err) => console.log(err));
//     }
//   }, [user]);

//   return (
//     <div className="appointment-container">
//       <h2 className="appointment-title">Your Appointments</h2>
//           <div style={{padding: 15}}>
//           {/* Link to the RatingGreaterThan4 page */}
//           <Link
//             to="/rating-greater-than-4"
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
//             View Healthcare Professionals with Rating Greater Than 4
//           </Link>
//           </div>
//       {appointments.length > 0 ? (
//         <table className="appointment-table">
//           <thead>
//             <tr>
//               <th>Appointment ID</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Status</th>
//               <th>Patient ID</th>
//               <th>Professional ID</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appointment) => {
//               const status = appointment.status.toLowerCase(); // Convert status to lowercase
//               return (
//                 <tr key={appointment.Appointment_id}>
//                   <td>{appointment.Appointment_id}</td>
//                   <td>{appointment.appointment_date}</td>
//                   <td>{appointment.appointment_time}</td>
//                   <td className={`status ${status}`}>
//                     {appointment.status}
//                   </td>
//                   <td>{appointment.patient_id}</td>
//                   <td>{appointment.professional_id}</td>
//                   <td className="actions">
//                     {/* Conditionally render links based on appointment status */}
//                     {status !== 'pending' && status !== 'cancelled' ? (
//                       <>
//                         <Link to={`/prescription/${appointment.Appointment_id}`} className="action-link">
//                           View Prescription
//                         </Link>
//                         {' | '}
//                         <Link to={`/give-feedback/${appointment.Appointment_id}`} className="action-link">
//                           Give Feedback
//                         </Link>
//                       </>
//                     ) : (
//                       <span className="disabled-link">View Prescription | Give Feedback</span>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : (
//         <p className="no-appointments">No appointments found.</p>
//       )}
//     </div>
//   );
// }

// export default AppointmentPage;
