import React from 'react'

const Radio = ({name , formik , radioOptions}) => {
  return (
    <div className="formControl">
      {radioOptions.map(item => (
        <React.Fragment key={item.value}>
        <input
            type="radio"
            name={name}
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            checked={formik.values.gender === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Radio;
