CREATE TABLE Address (
    address_id INT PRIMARY KEY,
    street_number VARCHAR(50),
    apartment_number VARCHAR(50),
    street_name VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20)
);

 CREATE TABLE Patient (
    patient_id INT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender ENUM('M', 'F', 'O'),
    phone_no VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(255),
    address_id INT,
    FOREIGN KEY (address_id) REFERENCES Address(address_id)
);

CREATE TABLE Healthcare_Professional (
    professional_id INT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100),
    role VARCHAR(50),
    phone_no VARCHAR(15),
    email VARCHAR(100),
    qualification TEXT,
    password VARCHAR(20) NOT NULL
);


CREATE TABLE Appointment (
    appointment_id INT PRIMARY KEY,
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    patient_id INT,
    professional_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (professional_id) REFERENCES Healthcare_Professional(professional_id)
);


CREATE TABLE Prescription (
    prescription_id INT PRIMARY KEY,
    date_issued DATE,
    medicine_name VARCHAR(255),
    dosage VARCHAR(100),
    patient_id INT,
    professional_id INT,
    appointment_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (professional_id) REFERENCES Healthcare_Professional(professional_id),
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

CREATE TABLE Feedback (
    feedback_id INT PRIMARY KEY,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comments TEXT,
    feedback_date DATE,
    patient_id INT,
    professional_id INT,
    appointment_id INT,
    FOREIGN KEY (patient_id) REFERENCES Patient(patient_id),
    FOREIGN KEY (professional_id) REFERENCES Healthcare_Professional(professional_id)
    FOREIGN KEY (appointment_id) REFERENCES Appointment(appointment_id)
);

INSERT INTO address (address_id, street_number, apartment_number, street_name, city, state, postal_code) VALUES
(1, '221', 'A1', 'MG Road', 'Mumbai', 'Maharashtra', '400001'),
(2, '56', 'B2', 'Ring Road', 'New Delhi', 'Delhi', '110001'),
(3, '12', 'C3', 'Lalbagh Road', 'Bangalore', 'Karnataka', '560001'),
(4, '432', '7D', 'Ashram Road', 'Ahmedabad', 'Gujarat', '380009'),
(5, '100', '8E', 'Park Street', 'Kolkata', 'West Bengal', '700016'),
(6, '789', 'G5', 'Banjara Hills', 'Hyderabad', 'Telangana', '500034'),
(7, '234', '12B', 'Marine Drive', 'Mumbai', 'Maharashtra', '400002'),
(8, '56', 'H2', 'Mount Road', 'Chennai', 'Tamil Nadu', '600002'),
(9, '89', '2A', 'Charminar Road', 'Hyderabad', 'Telangana', '500002'),
(10, '567', 'B7', 'Sarojini Nagar', 'New Delhi', 'Delhi', '110023'),
(11, '101', '5C', 'MG Road', 'Thiruvananthapuram', 'Kerala', '695001'),
(12, '202', 'A3', 'Juhu Beach Road', 'Mumbai', 'Maharashtra', '400049'),
(13, '103', '6C', 'MG Road', 'Bengaluru', 'Karnataka', '560076'),
(14, '420', '14C', 'EC', 'Bengaluru', 'Karnataka', '560100'),
(15, '120', '4C', 'C', 'Bengaluru', 'Karnataka', '560100'),
(16, '12', '45', 'ms road', 'Bengaluru', 'Karnataka', '560100'),
(17, '11', '120', 'pesu hostel', 'Bengaluru', 'Karnataka', '560100'),
(18, '1-11-40/87', '903', 'pesu hostel', 'bangalore', 'Karnataka', '560100'),
(19, '12', '45', 'ms road', 'Bengaluru', 'Karnataka', '560100'),
(20, '24', '120', 'Temple road', 'Bengaluru', 'Karnataka', '560076'),
(21, '1', '903', 'EC Road', 'Kashmir', 'Jammu', '798738');

INSERT INTO patient (patient_id, name, dob, gender, phone_no, email, password, address_id) VALUES
(1, 'Amit Sharma', '1990-05-15', 'M', '9876543210', 'amit.sharma@example.com', 'password1', 1),
(2, 'Priya Singh', '1987-02-12', 'F', '9876543221', 'priya.singh@example.com', 'password2', 2),
(3, 'Ravi Kumar', '1995-11-07', 'M', '9876543232', 'ravi.kumar@example.com', 'password3', 3),
(4, 'Sunita Patel', '1992-08-24', 'F', '9876543243', 'sunita.patel@example.com', 'password4', 4),
(5, 'Karan Malhotra', '1985-03-15', 'M', '9876543254', 'karan.malhotra@example.com', 'password5', 5),
(6, 'Neha Verma', '1990-06-19', 'F', '9876543265', 'neha.verma@example.com', 'password6', 6),
(7, 'Vikram Desai', '1983-12-05', 'M', '9876543276', 'vikram.desai@example.com', 'password7', 7),
(8, 'Asha Iyer', '1997-04-10', 'F', '9876543287', 'asha.iyer@example.com', 'password8', 8),
(9, 'Siddharth Rao', '1993-07-15', 'M', '9876543298', 'siddharth.rao@example.com', 'password9', 9),
(10, 'Pooja Kapoor', '1999-09-01', 'F', '9876543309', 'pooja.kapoor@example.com', 'password10', 10),
(11, 'Rakesh Nair', '1988-11-25', 'M', '9876543310', 'rakesh.nair@example.com', 'password11', 11),
(12, 'Anjali Joshi', '1994-03-18', 'F', '9876543321', 'anjali.joshi@example.com', 'password12', 12),
(13, 'Amaan', '2004-05-28', 'M', '8792697042', 'amaan@example.com', 'amaan', 19),
(14, 'Nabirasul A', '2004-06-30', 'M', '9999999999', 'nabirasula2004@gmail.com', 'Nabi@123', 20),
(15, 'Abdullah', '2024-11-20', 'M', '998748367', 'iampatient@gmail.com', '1234', 21);

INSERT INTO healthcare_professional (professional_id, name, specialization, role, phone_no, email, qualification, password) VALUES
(1, 'Dr. Arun Sharma', 'Cardiology', 'Doctor', '9876543210', 'arun.sharma@hospital.com', 'MBBS, MD', 'password123'),
(2, 'Dr. Priya Mehta', 'Dermatology', 'Doctor', '9876543211', 'priya.mehta@hospital.com', 'MBBS, MD', 'password456'),
(3, 'Dr. Suresh Patil', 'Physiotherapy', 'Physiotherapist', '9876543212', 'suresh.patil@hospital.com', 'BPT, MPT', 'password789'),
(4, 'Dr. Kavita Nair', 'Nutritionist', 'Nutritionist', '9876543213', 'kavita.nair@hospital.com', 'BSc, MSc', 'password012'),
(5, 'Dr. Rajiv Kapoor', 'Orthopedics', 'Doctor', '9876543214', 'rajiv.kapoor@hospital.com', 'MBBS, MS', 'password345'),
(6, 'Dr. Neha Gupta', 'Pediatrics', 'Doctor', '9876543215', 'neha.gupta@hospital.com', 'MBBS, MD', 'password678'),
(7, 'Dr. Anjali Verma', 'Physiotherapy', 'Physiotherapist', '9876543216', 'anjali.verma@hospital.com', 'BPT, MPT', 'password901'),
(8, 'Dr. Manish Kulkarni', 'Dentistry', 'Doctor', '9876543217', 'manish.kulkarni@hospital.com', 'BDS, MDS', 'password234'),
(9, 'Dr. Sneha Rao', 'Endocrinology', 'Doctor', '9876543218', 'sneha.rao@hospital.com', 'MBBS, MD', 'password567'),
(10, 'Dr. Kiran Desai', 'Neurology', 'Doctor', '9876543219', 'kiran.desai@hospital.com', 'MBBS, MD', 'password890'),
(12, 'Dr. Amaan', 'Physiotherapy', 'Physiotherapist', '8888888888', 'amaan@hospital.com', 'BPT, MPT', 'amaan123'),
(13, 'Amaan', 'Cardiologist', 'Doctor', '9972559474', 'Doctor@cardio.com', 'MBBS,MD cardio', '1234'),
(14, 'pqr', 'Dietician', 'Nutritionist', '7777777777', 'dietician@hospital.com', 'BPT, MPT', '123');

DELIMITER $$

CREATE TRIGGER SetInitialStatusOnBooking
BEFORE INSERT ON Appointment
FOR EACH ROW
BEGIN
    SET NEW.status = 'Pending';
END $$

DELIMITER ;

CREATE PROCEDURE GetUpcomingAppointments(IN patientId INT)
BEGIN
    SELECT 
        a.appointment_id,
        a.appointment_date,
        a.status,
        h.name AS doctor_name
    FROM 
        appointment a
    JOIN healthcare_professional h ON a.professional_id = h.professional_id
    WHERE a.patient_id = patientId
    AND a.appointment_date >= CURDATE()
    ORDER BY a.appointment_date;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetProfessionalUpcomingAppointments(IN professionalId INT)
BEGIN
    SELECT 
        a.appointment_id,
        a.appointment_date,
        a.status,
        p.name AS patient_name
    FROM 
        appointment a
    JOIN patient p ON a.patient_id = p.patient_id
    WHERE a.professional_id = professionalId
    AND a.appointment_date >= CURDATE()
    ORDER BY a.appointment_date;
END $$

DELIMITER ;

DELIMITER $$

CREATE FUNCTION GetAverageFeedback(professionalId INT)
RETURNS DECIMAL(5, 2)
DETERMINISTIC
BEGIN
    DECLARE avgFeedback DECIMAL(5,2);
    SELECT AVG(f.rating) INTO avgFeedback
    FROM feedback f
    WHERE f.professional_id = professionalId;
    RETURN avgFeedback;
END $$

DELIMITER ;

-- Query to get appointment count for a specific healthcare professional
SELECT
    hp.professional_id,
    hp.name AS healthcare_professional_name,
    COUNT(a.Appointment_id) AS appointment_count
FROM
    healthcare_professional hp
LEFT JOIN
    appointment a ON hp.professional_id = a.professional_id
WHERE
    hp.professional_id = 1  -- Replace '1' with the desired professional_id
GROUP BY
    hp.professional_id, hp.name;

-- Query to get patients with confirmed appointments for a specific professional
SELECT 
    p.patient_id, 
    p.name AS patient_name, 
    a.appointment_date, 
    a.status
FROM 
    Patient p
JOIN 
    Appointment a ON p.patient_id = a.patient_id
WHERE 
    a.status = 'Confirmed' 
    AND a.professional_id = 1; -- Replace '1' with the desired professional_id

-- Query to get healthcare professionals with an average rating greater than 4
SELECT 
    hp.professional_id, 
    hp.name, 
    AVG(f.rating) AS avg_rating
FROM 
    Healthcare_Professional hp
JOIN 
    Feedback f ON hp.professional_id = f.professional_id
GROUP BY 
    hp.professional_id, 
    hp.name
HAVING 
    AVG(f.rating) > 4;






