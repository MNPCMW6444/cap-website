import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { BackingStatus } from "@caphub-group/caphub-types";

const BSField = ({ formData, setFormData }: FieldProps) => {
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      backingStatus: event.target.value as BackingStatus,
    });
  };

  return (
    <TextField
      fullWidth
      select
      required
      name="backingStatus"
      label="Backing Status"
      value={formData.backingStatus}
      onChange={handleChange}
      SelectProps={{
        native: true,
      }}
    >
      {Object.values(BackingStatus).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </TextField>
  );
};

export default BSField;
