import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const savedData = {
  name: "Ali Moradpour",
  email: "ali@gmail.com",
  number: "09393673709",
  password: "Ali!2#",
  passwordConfirm: "Ali!2#",
  gendere: "0",
};
const initialValues = {
  name: "",
  email: "",
  number: "",
  password: "",
  passwordConfirm: "",
  gender: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(5, "Must be more than 5 char"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  number: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{11}$/, "Invalid Phone Number")
    .nullable(),
  password: Yup.string()
    .required("Password is Required")
    .min(8, "must be more than 8 char")
    .matches(
      /^.*[!@#$%^&*()_+\-={};':"|,.<>?].*$/,
      "Need one special character"
    ),
  passwordConfirm: Yup.string()
    .required("Password Confirmation is Required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
  gender: Yup.string().required("gender is Required"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="formControl">
          <label>Name</label>
          <input type="text" {...formik.getFieldProps("name")} name="name" />
          {formik.errors.name && formik.touched.name && (
            <span className="error">{formik.errors.name}</span>
          )}
        </div>
        <div className="formControl">
          <label>Email</label>
          <input type="text" {...formik.getFieldProps("email")} name="email" />
          {formik.errors.email && formik.touched.email && (
            <span className="error">{formik.errors.email}</span>
          )}
        </div>
        <div className="formControl">
          <label>Phone Number</label>
          <input
            type="text"
            {...formik.getFieldProps("number")}
            name="number"
          />
          {formik.errors.number && formik.touched.number && (
            <span className="error">{formik.errors.number}</span>
          )}
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <span className="error">{formik.errors.password}</span>
          )}
        </div>
        <div className="formControl">
          <label>Password Conformation</label>
          <input
            type="password"
            {...formik.getFieldProps("passwordConfirm")}
            name="passwordConfirm"
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <span className="error">{formik.errors.passwordConfirm}</span>
          )}
        </div>
        <div className="formControl">
          <input
            type="radio"
            name="gender"
            id="0"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            name="gender"
            id="1"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Female</label>
        </div>
        <button onClick={() => setFormValues(savedData)}>Load Data</button>
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
