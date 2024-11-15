import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import AppointmentPage from './AppointmentPage';
import FeedbackPage from './FeedbackPage';
import RegisterPage from './RegisterPage';
import PrescriptionPage from './PrescriptionPage';
import HealthcareProfessionalPage from './HealthcareProfessionalPage';
import BookAppointmentPage from './BookAppointmentPage';
import ViewFeedbackPage from './ViewFeedbackPage'; 
import IssuePrescriptionPage from './IssuePrescriptionPage';
import UserManagementPage from './UserManagementPage';
import QueryDashboardPage from './QueryDashboardPage';
import ProceduresDashboardPage from './ProceduresDashboardPage';
import AppointmentCountsPage from './AppointmentCountsPage';
import RatingGreaterThan4 from './RatingGreaterThan4';
import ConfirmedAppointments from './ConfirmedAppointments';
import UpcomingAppointmentsPatient from './UpcomingAppointmentsPatient';
import UpcomingAppointmentsProfessional from './UpcomingAppointmentsProfessional';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/book-appointment" element={<BookAppointmentPage />} />
                    <Route path="/appointments" element={<AppointmentPage />} />
                    <Route path="/prescription/:appointmentId" element={<PrescriptionPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/healthcare-professional" element={<HealthcareProfessionalPage />} />
                    <Route path="/issue-prescription/:appointmentId" element={<IssuePrescriptionPage />} />
                    <Route path="/give-feedback/:appointment_id" element={<FeedbackPage />} />
                    <Route path="/view-feedback/:appointment_id" element={<ViewFeedbackPage />} />
                    <Route path="/user-management" Component={UserManagementPage} />
                    <Route path="/query-dashboard" element={<QueryDashboardPage />} />
                    <Route path="/procedures-dashboard" element={<ProceduresDashboardPage />} />
                    <Route path="/appointment-counts" element={<AppointmentCountsPage />} />
                    <Route path="/appointment-counts/:professional_id" element={<AppointmentCountsPage />} />
                    <Route path="/rating-greater-than-4" element={<RatingGreaterThan4 />} />
                    <Route path="/confirmed-appointments/:professionalId" element={<ConfirmedAppointments />} />
                    <Route path="/upcoming-appointments/patient/:patientId" element={<UpcomingAppointmentsPatient />} />
                    <Route path="/upcoming-appointments/professional/:professionalId" element={<UpcomingAppointmentsProfessional />} />
                    


                </Routes>
            </div>
        </Router>
    );
};

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './HomePage';
// import LoginPage from './LoginPage';
// import AppointmentPage from './AppointmentPage';
// import FeedbackPage from './FeedbackPage';
// import RegisterPage from './RegisterPage';
// import PrescriptionPage from './PrescriptionPage';
// import HealthcareProfessionalPage from './HealthcareProfessionalPage';
// import BookAppointmentPage from './BookAppointmentPage';
// import ViewFeedbackPage from './ViewFeedbackPage'; 
// import IssuePrescriptionPage from './IssuePrescriptionPage';

// const App = () => {
//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/login" element={<LoginPage />} />
//                     <Route path="/book-appointment" element={<BookAppointmentPage />} />
//                     <Route path="/appointments" element={<AppointmentPage />} />
//                     <Route path="/prescription/:appointmentId" element={<PrescriptionPage />} />
//                     <Route path="/feedback" element={<FeedbackPage />} />
//                     <Route path="/register" element={<RegisterPage />} />
//                     <Route path="/healthcare-professional" element={<HealthcareProfessionalPage />} />
//                     <Route path="/issue-prescription/:appointmentId" element={<IssuePrescriptionPage />} />
//                     <Route path="/feedback/:appointment_id" element={<ViewFeedbackPage />} />
//                     <Route path="/view-feedback/:appointment_id" element={<ViewFeedbackPage />} />
                    
//                 </Routes>
//             </div>
//         </Router>
//     );
// };

// export default App;
