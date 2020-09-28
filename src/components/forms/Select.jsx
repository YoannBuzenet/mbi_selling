import React from "react";

const Select = ({ name, value, onChange, children }) => {
  return (
    <div className="form-group">
      <select name={name} id={name} onChange={onChange} value={value}>
        {children}
      </select>
    </div>
  );
};

export default Select;
