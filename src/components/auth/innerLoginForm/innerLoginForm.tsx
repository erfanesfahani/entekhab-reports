"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function InnerLoginForm() {
  return (
    <div>
      <h1>Login Page</h1>
      <Formik
        initialValues={{ user: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.user) {
            errors.user = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="user" name="user" />
            <ErrorMessage name="user" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
