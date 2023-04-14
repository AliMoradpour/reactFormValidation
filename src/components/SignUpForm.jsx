import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "./common/Input";
import Radio from "./common/Radio";
import SelectComponent from "./common/SelectComponent";
import CheckBoxInput from "./common/CheckBoxInput";

const checkBoxOptions = [
  { label: "React.js", value: "React" },
  { label: "Vue.js", value: "Vue" },
];
const radioOptions = [
  { label: "Male", value: "0" },
  { label: "Female", value: "1" },
];

const selectOptions = [
  { label: "select Nationality ...", value: "" },
  { label: "Iran", value: "IR" },
  { label: "Germany", value: "GER" },
  { label: "USA", value: "US" },
];

const initialValues = {
  name: "",
  email: "",
  number: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

const onSubmit = (values) => {
  axios
    .post("http://localhost:3001/users", values)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.message));
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
  nationality: Yup.string().required("Select Nationality"),
  intrests: Yup.array().min(1).required("at Least Select one expertise"),
  terms: Yup.boolean()
    .required("accept the Terms")
    .oneOf([true], "The Terms and Conditions must be accepted."),
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email" name="email" formik={formik} />
        <Input label="Phone Number" name="number" formik={formik} />
        <Input
          label="Password"
          name="password"
          type="password"
          formik={formik}
        />
        <Input
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          formik={formik}
        />

        <Radio formik={formik} radioOptions={radioOptions} name="gender" />
        <SelectComponent
          formik={formik}
          selectOptions={selectOptions}
          name="nationality"
        />
        <CheckBoxInput
          formik={formik}
          checkBoxOptions={checkBoxOptions}
          name="intrests"
        />

        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Terms and Conditions</label>
        {formik.errors.terms && formik.touched.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
