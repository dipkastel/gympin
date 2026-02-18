import { TextField } from "@mui/material";
import { useState } from "react";
import { fixMobile } from "../helper/utils";

export const ValidatedTextField = ({
  label,
  variant,
  name,
  validator,
  sx,
  disabled,
  required,
  slotProps,
  isMobile,
  type,
  maxLength,
  trigerOn,
  triger,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (isMobile) {
      try {
        newValue = fixMobile(newValue);
      } catch (e) {}
    }
    if (maxLength && newValue?.length > maxLength) {
      try {
        newValue = newValue.substring(0, maxLength);
      } catch (e) {}
    }
    if (trigerOn && newValue?.length === trigerOn) {
      try {
        triger(e);
      } catch (e) {}
    }
    setValue(newValue);
    const errorMessage = validator(newValue);
    setError(errorMessage);
  };
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      sx={sx}
      slotProps={slotProps}
      type={type}
      disabled={disabled}
      required={required}
      variant={variant}
      onChange={(e) => handleChange(e)}
      error={!!error}
      helperText={error}
    />
  );
};
