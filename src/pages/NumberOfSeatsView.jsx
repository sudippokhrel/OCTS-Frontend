import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Example data of number of seats
const numberOfSeatsData = [
  {
    id: 1,
    department: 'Bachelor of Computer Application',
    availableSeats: 10,
    totalSeats: 30,
  },
  {
    id: 2,
    department: 'Bachelor of Civil and Rural Enginnering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 3,
    department: 'Bachelor of Engineering in Information Technology',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 4,
    department: 'Bachelor of Science in Environmental Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 5,
    department: 'Bachelor of Software Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 6,
    department: 'Bachelor of Electrical and Electronics Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 7,
    department: 'Bachelor of Architecture',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 8,
    department: 'Bachelor of Computer Engineering ',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 9,
    department: 'Bachelor of Civil Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 10,
    department: 'Bachelor of Electronics and Communication Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 11,
    department: 'Bachelor of Civil Engineering for Diploma Holders',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 12,
    department: 'Master of Science in interdisciplinary Water Resource Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 13,
    department: 'Master of Science in Construction Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 14,
    department: 'Master of Science in Natural Resource Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 15,
    department: 'Master of Science in Environmental Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 16,
    department: 'Master of Science in Computer Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 17,
    department: 'Master of Science in Structural Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 18,
    department: 'Master of Science in Transportation Engineering and Management',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 19,
    department: 'Master of Science in Computer Science',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 20,
    department: 'Master of Science in Information System Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  {
    id: 21,
    department: 'Master of Science in Hydro-power Engineering',
    availableSeats: 5,
    totalSeats: 20,
  },
  

   
  
  
  // Add more number of seats data as needed
];

// Define the validation schema using Yup (not required in this case as it's only a view)
const validationSchema = Yup.object().shape({});

const NumberOfSeatsView = () => {
  return (
    <div>
      <h1>Number of Seats</h1>

      {numberOfSeatsData.map((seats) => (
        <div key={seats.id}>
          <h3>Department: {seats.department}</h3>
          <p>
            <strong>Available Seats:</strong> {seats.availableSeats}
          </p>
          <p>
            <strong>Total Seats:</strong> {seats.totalSeats}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default NumberOfSeatsView;
