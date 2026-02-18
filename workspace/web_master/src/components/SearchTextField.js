import React, { useEffect, useState } from "react";
import { debounce, TextField } from "@mui/material";

export const SearchTextField = ({
  autoFocus,
  margin,
  label,
  value,
  onChange,
  fullWidth,
  variant,
  sx,
  size,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      fetchData(inputValue);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [inputValue]);

  function fetchData(event) {
    onChange(event);
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <>
      <TextField
        autoFocus={autoFocus}
        margin={margin}
        label={label}
        value={inputValue}
        onChange={handleChange}
        fullWidth={fullWidth}
        variant={variant}
        sx={sx}
        size={size}
      />
    </>
  );
};

export default SearchTextField;
