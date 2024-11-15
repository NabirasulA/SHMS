const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nabi@123',
    database: 'shms',
    timezone: 'Z'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Routes
app.get('/', (req, res) => {
    return res.json("From Backend side");
});

app.get('/patients', (req, res) => {
    const query = "SELECT * FROM patient";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        return res.json(results);
    });
});

// Sample data or database query function
// app.get('/api/join-query', (req, res) => {
//     // Replace this with your actual database join query logic
//     const joinResults = [
//         { patient_name: 'John Doe', appointment_date: '2024-11-11', status: 'Confirmed' },
//         // Add more sample data as needed
//     ];
    
//     res.json(joinResults);
// });

app.get('/api/appointment-counts/:professional_id', (req, res) => {
    const professionalId = req.params.professional_id;
  
    const query = `
      SELECT
        hp.professional_id,
        hp.name AS healthcare_professional_name,
        COUNT(a.Appointment_id) AS appointment_count
      FROM
        healthcare_professional hp
      LEFT JOIN
        appointment a ON hp.professional_id = a.professional_id
      WHERE
        hp.professional_id = ?
      GROUP BY
        hp.professional_id, hp.name;
    `;
  
    db.query(query, [professionalId], (error, results) => {
      if (error) {
        console.error('Error fetching appointment count:', error);
        return res.status(500).json({ error: 'Failed to fetch appointment count' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Healthcare professional not found' });
      }
  
      res.status(200).json(results[0]); // Send the first result
    });
  });
  
  app.get('/api/confirmed-appointments/:professional_id', (req, res) => {
    const professionalId = req.params.professional_id;
  
    if (!professionalId) {
      return res.status(400).json({ error: 'Professional ID is required' });
    }
  
    const query = `
      SELECT p.patient_id, p.name AS patient_name, a.appointment_date, a.status
      FROM Patient p
      JOIN Appointment a ON p.patient_id = a.patient_id
      WHERE a.status = 'Confirmed' AND a.professional_id = ?;
    `;
  
    db.query(query, [professionalId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Error executing join query' });
      }
  
      res.json(results);
    });
  });
  

// Fetch upcoming appointments for patient
app.get('/api/upcoming-appointments/:patient_id', (req, res) => {
    const patientId = req.params.patient_id;  // Use params, not query

    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    // Call the stored procedure to get the patient's upcoming appointments
    const query = 'CALL GetUpcomingAppointments(?)';
    db.query(query, [patientId], (err, results) => {
        if (err) {
            console.error('Error fetching upcoming appointments for patient:', err);
            return res.status(500).json({ error: 'Error fetching upcoming appointments' });
        }

        // Return the results (appointments)
        res.json(results[0]);
    });
});


// Fetch upcoming appointments for healthcare professional
app.get('/api/professional-upcoming-appointments/:professional_id', (req, res) => {
    const professionalId = req.params.professional_id;

    if (!professionalId) {
        return res.status(400).json({ error: 'Professional ID is required' });
    }

    // Call the stored procedure to get the professional's upcoming appointments
    const query = 'CALL GetProfessionalUpcomingAppointments(?)';
    db.query(query, [professionalId], (err, results) => {
        if (err) {
            console.error('Error fetching upcoming appointments for professional:', err);
            return res.status(500).json({ error: 'Error fetching upcoming appointments' });
        }

        // Return the results (appointments)
        res.json(results[0]);
    });
});

// Make sure to use the correct route format
app.get('/api/average-feedback/:professionalId', (req, res) => {
  const professionalId = req.params.professionalId; // Extracting the professionalId parameter
  const query = 'SELECT GetAverageFeedback(?) AS avg_feedback';
  
  // Assuming you use MySQL and a query function to interact with your DB
  db.query(query, [professionalId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching average feedback score' });
      return;
    }
    res.json(results[0]); // Send back the result with average feedback
  });
});


  
 
  

// Join query endpoint
// app.get('/api/join-query', (req, res) => {
//     const query = `
//         SELECT p.patient_id, p.name AS patient_name, a.appointment_date, a.status
//         FROM Patient p
//         JOIN Appointment a ON p.patient_id = a.patient_id
//         WHERE a.status = 'Confirmed';
//     `;
//     db.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ error: 'Error executing join query' });
//             return;
//         }
//         res.json(results);
//     });
// });

// Aggregate query endpoint
// app.get('/api/aggregate-query', (req, res) => {
//     const query = `
//         SELECT ap.professional_id, hp.name AS healthcare_professional_name, COUNT(*) AS appointment_count
//         FROM Appointment ap
//         JOIN Healthcare_Professional hp ON ap.professional_id = hp.professional_id
//         GROUP BY ap.professional_id
//         ORDER BY appointment_count DESC;
//     `;
//     db.query(query, (err, results) => {
//         if (err) {
//             res.status(500).json({ error: 'Error executing aggregate query' });
//             return;
//         }
//         res.json(results);
//     });
// });

// Nested query endpoint for healthcare professionals with high ratings
app.get('/api/nested-query', (req, res) => {
    const query = `
      SELECT hp.professional_id, hp.name, AVG(f.rating) AS avg_rating
      FROM Healthcare_Professional hp
      JOIN Feedback f ON hp.professional_id = f.professional_id
      GROUP BY hp.professional_id, hp.name
      HAVING AVG(f.rating) > 4;
     `;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error executing nested query' });
        return;
      }
      res.json(results);
    });
  });
  

// In your backend (e.g., routes.js or app.js)
// Route to get upcoming appointments by patient ID
// app.get('/api/upcoming-appointments', (req, res) => {
//     const patientId = req.query.patientId;
//     if (!patientId) {
//         res.status(400).json({ error: 'Patient ID is required' });
//         return;
//     }

//     const query = 'CALL GetUpcomingAppointments(?)';
//     db.query(query, [patientId], (err, results) => {
//         if (err) {
//             res.status(500).json({ error: 'Error fetching upcoming appointments' });
//             return;
//         }
//         res.json(results[0]);
//     });
// });


// Route to get the average feedback score for a specific healthcare professional
// app.get('/api/average-feedback/:professionalId', (req, res) => {
//     const professionalId = req.params.professionalId;
//     const query = 'SELECT GetAverageFeedback(?) AS avg_feedback';
//     db.query(query, [professionalId], (err, results) => {
//         if (err) {
//             res.status(500).json({ error: 'Error fetching average feedback score' });
//             return;
//         }
//         res.json(results[0]);
//     });
// });

// Route to update the appointment status with the trigger handling subsequent updates
app.put('/api/update-appointment-status/:appointmentId', (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { status } = req.body; // Assume status is passed in request body

    // Update query that will activate the trigger in the database
    const query = 'UPDATE Appointment SET status = ? WHERE appointment_id = ?';
    db.query(query, [status, appointmentId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating appointment status' });
            return;
        }
        // Check if any rows were affected to confirm the update
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'No appointment found with the provided ID' });
            return;
        }
        res.json({ message: 'Appointment status updated successfully' });
    });
});



app.post('/create-user', (req, res) => {
    const { username, password, role } = req.body;
    let query = '';
  
    if (role === 'patient') {
      query = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}';
               GRANT SELECT, INSERT ON shms_database.appointments TO '${username}'@'localhost';
               GRANT SELECT ON shms_database.professionals TO '${username}'@'localhost';`;
    } else if (role === 'professional') {
      query = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}';
               GRANT SELECT, UPDATE ON shms_database.appointments TO '${username}'@'localhost';
               GRANT SELECT ON shms_database.patients TO '${username}'@'localhost';`;
    }
  
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error creating user');
      } else {
        res.status(200).send('User created successfully');
      }
    });
  });
  

app.post('/register', (req, res) => {
    const {
        role,
        name,
        dob,
        gender,
        specialization,
        healthcare_role,
        phone_no,
        email,
        qualification,
        password,
        street_number,
        apartment_number,
        street_name,
        city,
        state,
        postal_code
    } = req.body;

    if (role === 'patient') {
        const addressQuery = `INSERT INTO address (street_number, apartment_number, street_name, city, state, postal_code)
                              VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(addressQuery, [street_number, apartment_number, street_name, city, state, postal_code], (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error inserting address' });
            }

            const addressId = result.insertId;
            const patientQuery = `INSERT INTO patient (name, dob, gender, phone_no, email, password, address_id)
                                  VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db.query(patientQuery, [name, dob, gender, phone_no, email, password, addressId], (err) => {
                if (err) {
                    return res.status(500).send({ message: 'Error inserting patient' });
                }
                res.status(200).send({ message: 'Patient registered successfully' });
            });
        });
    } else if (role === 'healthcare_professional') {
        const hpQuery = `INSERT INTO healthcare_professional (name, role, specialization, phone_no, email, qualification, password)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(hpQuery, [name, healthcare_role, specialization, phone_no, email, qualification, password], (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error inserting healthcare professional' });
            }
            res.status(200).send({ message: 'Healthcare Professional registered successfully' });
        });
    }
});






// Patient login
app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;
    const table = userType === 'patient' ? 'patient' : 'healthcare_professional';
    const query = `SELECT * FROM ${table} WHERE email = ? AND password = ?`;

    db.query(query, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.length > 0) {
            return res.json(result[0]);
        } else {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    });
});

app.post('/appointments/book', (req, res) => {
    const { patient_id, appointment_date, appointment_time, professional_id } = req.body;
    const query = `
      INSERT INTO appointment (patient_id, appointment_date, appointment_time, professional_id, status) 
      VALUES (?, ?, ?, ?, 'Pending')`;
  
    db.query(query, [patient_id, appointment_date, appointment_time, professional_id], (err) => {
      if (err) {
        console.error("Error booking appointment:", err);
        return res.status(500).json({ error: 'Failed to book appointment' });
      }
      res.status(200).json({ message: 'Appointment booked successfully' });
    });
  });
  
  // Fetch healthcare professionals
app.get('/healthcare-professionals', (req, res) => {
    const query = 'SELECT professional_id, name, specialization FROM healthcare_professional';
    
    db.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching healthcare professionals:", err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        return res.json(result);
    });
});


// Add new appointment
app.post('/appointments', (req, res) => {
    const { appointment_date, appointment_time, patient_id, professional_id } = req.body; // Removed 'status' from destructuring

    const query = `
        INSERT INTO appointment (appointment_date, appointment_time, patient_id, professional_id)
        VALUES (?, ?, ?, ?)
    `;
    
    db.query(query, [appointment_date, appointment_time, patient_id, professional_id], (err, result) => {
        if (err) {
            console.error("Error inserting appointment:", err);
            return res.status(500).json({ error: 'Failed to add appointment' });
        }
        return res.json({ message: 'Appointment added successfully', appointmentId: result.insertId });
    });
});


app.get('/appointments', (req, res) => {
    const patient_id = req.query.patient_id;

    if (!patient_id) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    const query = 'SELECT * FROM appointment WHERE patient_id = ?';

    db.query(query, [patient_id], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Format the date for each appointment
        const formattedResults = results.map((appointment) => {
            const date = new Date(appointment.appointment_date);
            appointment.appointment_date = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            return appointment;
        });

        return res.json(formattedResults);
    });
});


// Handle feedback submission
app.post('/feedback', (req, res) => {
    const feedback_date = new Date(); // Automatically set feedback date to current date
    const { rating, comments, patient_id, professional_id, appointment_id } = req.body;

    // Validate required fields
    if (!rating || !comments || !patient_id || !professional_id || !appointment_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // SQL query to insert feedback into the database
    const query = `
        INSERT INTO feedback (rating, comments, feedback_date, patient_id, professional_id, appointment_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Execute the query
    db.query(query, [rating, comments, feedback_date, patient_id, professional_id, appointment_id], (err, result) => {
        if (err) {
            console.error('Error inserting feedback:', err);
            return res.status(500).json({ error: 'Failed to submit feedback' });
        }
        // Successful response after feedback is inserted
        return res.status(201).json({ message: 'Feedback submitted successfully' });
    });
});

// Handle retrieving feedback for a specific appointment
app.get('/feedback/:appointmentId', (req, res) => {
    const { appointmentId } = req.params;

    // SQL query to fetch feedback based on appointment ID
    const query = `
        SELECT f.rating, f.comments, f.feedback_date, f.patient_id, f.professional_id
        FROM feedback f
        WHERE f.appointment_id = ?
    `;

    // Execute the query
    db.query(query, [appointmentId], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.length > 0) {
            return res.json(result[0]); // Return the first result found
        } else {
            return res.status(404).json({ error: 'No feedback found for this appointment' });
        }
    });
});

  


app.get('/appointments/:professionalId', (req, res) => {
    const { professionalId } = req.params;
  
    // Query to get appointments where the professional_id matches
    const query = `
      SELECT * FROM appointment 
      WHERE professional_id = ?`;
  
    db.query(query, [professionalId], (err, result) => {
      if (err) {
        console.error('Error fetching appointments:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      return res.json(result); // Return appointments for the logged-in professional
    });
  });
  
// Fetch appointments for healthcare professionals
// app.get('/professional-appointments', (req, res) => {
//     const query = 'SELECT * FROM appointments WHERE professional_id = ?';
//     const professional_id = req.query.professional_id;

//     db.query(query, [professional_id], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         return res.json(result);
//     });
// });

// Route to update the appointment status
app.post('/appointments/:id/:status', (req, res) => {
    const { id, status } = req.params;
  
    // Check if the status is valid
    if (!['confirmed', 'cancelled'].includes(status.toLowerCase())) {
      return res.status(400).send({ error: 'Invalid status provided' });
    }
  
    // Update the status in the database
    const query = `UPDATE Appointment SET status = ? WHERE appointment_id = ?`;
    db.query(query, [status.charAt(0).toUpperCase() + status.slice(1), id], (err, result) => {
      if (err) {
        console.error('Error updating appointment status:', err);
        return res.status(500).send({ error: 'Failed to update appointment status' });
      }
  
      // Respond with success message
      if (result.affectedRows > 0) {
        res.send({ message: `Appointment status updated to ${status.charAt(0).toUpperCase() + status.slice(1)}` });
      } else {
        res.status(404).send({ error: 'Appointment not found' });
      }
    });
  });

// Approve appointment by healthcare professional
// app.post('/appointments/:id/approve', (req, res) => {
//     const appointment_id = req.params.id;
//     const query = 'UPDATE appointments SET status = "approved" WHERE id = ?';

//     db.query(query, [appointment_id], (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         return res.json({ message: 'Appointment approved' });
//     });
// });

// Cancel appointment by healthcare professional
// app.post('/appointments/:id/cancel', (req, res) => {
//     const appointment_id = req.params.id;
//     const query = 'UPDATE appointments SET status = "cancelled" WHERE id = ?';

//     db.query(query, [appointment_id], (err) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         return res.json({ message: 'Appointment cancelled' });
//     });
// });

// Update appointment status
// app.post('/appointments/:appointmentId/:status', (req, res) => {
//     const { appointmentId, status } = req.params;
//     const query = `
//       UPDATE appointment
//       SET status = ?
//       WHERE Appointment_id = ?`;
    
//     db.query(query, [status, appointmentId], (err) => {
//       if (err) {
//         console.error('Error updating appointment status:', err);
//         return res.status(500).send('Error updating status');
//       }
//       res.send('Status updated successfully');
//     });
//   });

  // Delete appointment
    app.delete('/appointments/:appointmentId', (req, res) => {
        const { appointmentId } = req.params;

        const query = 'DELETE FROM appointment WHERE Appointment_id = ?';

        db.query(query, [appointmentId], (err, result) => {
            if (err) {
                console.error("Error deleting appointment:", err);
                return res.status(500).json({ error: 'Failed to delete appointment' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Appointment not found' });
            }

            return res.json({ message: 'Appointment deleted successfully' });
        });
    });

  
  
  app.post('/prescriptions', (req, res) => {
    const { date_issued, medicine_name, dosage } = req.body;
  
    // Basic validation for required fields
    if (!medicine_name || !dosage || !date_issued) {
      return res.status(400).send('Missing required fields');
    }
  
    const query = 'INSERT INTO prescription (date_issued, medicine_name, dosage) VALUES (?, ?, ?)';
    db.query(query, [date_issued, medicine_name, dosage], (err, result) => {
      if (err) {
        console.error('Error inserting prescription:', err);
        res.status(500).send('Error issuing prescription');
      } else {
        res.status(201).send('Prescription issued successfully');
      }
    });
  });
  
  app.post('/prescription/:appointment_id', (req, res) => {
    const { appointment_id } = req.params;
    const { medicine_name, dosage, patient_id, professional_id } = req.body;

    const query = `
      INSERT INTO prescription (date_issued, medicine_name, dosage, patient_id, professional_id, appointment_id)
      VALUES (NOW(), ?, ?, ?, ?, ?)
    `;

    db.query(query, [medicine_name, dosage, patient_id, professional_id, appointment_id], (err, result) => {
      if (err) {
        console.error('Error inserting prescription:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).send('Prescription issued successfully');
    });
});

app.get('/prescription/:appointmentId', (req, res) => {
    const { appointmentId } = req.params;

    // Query to get prescription details for the given appointment
    const query = `
        SELECT p.medicine_name, p.dosage, p.date_issued
        FROM prescription p
        WHERE p.appointment_id = ?
    `;

    db.query(query, [appointmentId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (result.length > 0) {
            return res.json(result[0]);
        } else {
            return res.status(404).json({ error: 'No prescription found for this appointment' });
        }
    });
});

  

  
//   Fetch feedback for a specific patient
//   app.get('/feedback/:patientId', (req, res) => {
//     const { patientId } = req.params;
//     const query = `
//       SELECT * FROM feedback
//       WHERE patient_id = ?`;
    
//     db.query(query, [patientId], (err, result) => {
//       if (err) {
//         console.error('Error fetching feedback:', err);
//         return res.status(500).send('Error fetching feedback');
//       }
//       res.json(result);
//     });
//   });
  

// Start server
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});





