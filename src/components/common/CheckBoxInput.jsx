import React from "react";

const CheckBoxInput = ({ name, formik, checkBoxOptions }) => {
  return (
    <div className="formControl">
      {checkBoxOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name].includes(item.value)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckBoxInput;
