import React from "react";
import { useIntl } from "react-intl";

const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  idNumber,
  className = "",
  type = "text",
  minlength = 2,
  required = false,
}) => {
  //Hook Intl to translate an attribute
  const intl = useIntl();

  return (
    <div className="field">
      <label htmlFor={idNumber}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className={className}
        placeholder={
          placeholder
            ? placeholder.props
              ? intl.formatMessage({
                  id: placeholder.props.id,
                  defaultMessage: placeholder.props.defaultMessage,
                })
              : placeholder
            : null
        }
        name={name}
        id={idNumber}
        required={required}
        minLength={minlength}
      />
    </div>
  );
};

export default Field;
