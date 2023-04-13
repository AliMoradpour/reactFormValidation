import { useFormik } from "formik";
const initialValues = {
  name: "",
  email: "",
  password: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};

  if (!values.name) errors.name = "Name is Required";
  if (!values.email) errors.email = "Email is Required";
  if (!values.password) errors.password = "Password is Required";
  return errors;
};

const SignUpForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <span className="error">{formik.errors.name}</span>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <span className="error">{formik.errors.email}</span>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <span className="error">{formik.errors.password}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
