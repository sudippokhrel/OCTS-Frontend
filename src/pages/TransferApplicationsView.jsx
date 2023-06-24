import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Example data of transfer applications
const transferApplicationsData = [
  {
    id: 1,
    name: 'John Doe',
    department: 'Marketing',
    reason: 'Seeking new opportunities',
  },
  {
    id: 2,
    name: 'Jane Smith',
    department: 'Sales',
    reason: 'Relocating to a different city',
  },
  // Add more transfer applications as needed
];

// Define the validation schema using Yup (not required in this case as it's only a view)
const validationSchema = Yup.object().shape({});

const TransferApplicationsView = () => {
  return (
    <div>
      <h1>Transfer Applications</h1>

      {transferApplicationsData.map((application) => (
        <div key={application.id}>
          <h3>Transfer Application #{application.id}</h3>
          <p>
            <strong>Name:</strong> {application.name}
          </p>
          <p>
            <strong>Department:</strong> {application.department}
          </p>
          <p>
            <strong>Reason for Transfer:</strong> {application.reason}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TransferApplicationsView;
