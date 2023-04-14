const SelectComponent = ({selectOptions , name , formik}) => {
  return (
    <div className="formControl" {...formik.ge}>
      <select name={name} {...formik.getFieldProps(name)}>
        {selectOptions.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="error">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default SelectComponent;
