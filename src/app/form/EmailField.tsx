import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";

const EmailField = ({ formData, setFormData }: FieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: event.target.value });
  };

  return (
    <TextField
      fullWidth
      required
      type="email"
      name="email"
      label="Email"
      value={formData.email}
      onChange={handleChange}
    />
  );
};

export default EmailField;
