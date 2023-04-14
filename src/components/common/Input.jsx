const Input = ({label , name , formik , type = "text"}) => {
  return (
    <div className="formControl">
      <label htmlFor={name}>{label}</label>
      <input type={type} {...formik.getFieldProps(name)} name={name} />
      {formik.errors[name] && formik.touched[name] && (
        <span className="error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default Input;
