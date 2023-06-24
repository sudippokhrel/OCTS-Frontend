import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  department: Yup.string().required('Department is required'),
  comments: Yup.string().required('Comments are required'),
});

const DeanPageForm = () => {
  // Initial form values
  const initialValues = {
    name: '',
    department: '',
    comments: '',
  };

  // Form submission handler
  const handleSubmit = (values) => {
    // Handle form submission logic here, such as making an API request
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="department">Department</label>
          <Field type="text" id="department" name="department" />
          <ErrorMessage name="department" component="div" />
        </div>

        <div>
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" id="comments" name="comments" />
          <ErrorMessage name="comments" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default DeanPageForm;
