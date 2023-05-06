import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { Vertical } from "@caphub-group/caphub-types";

const VField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      select
      required
      name="vertical"
      label="Vertical"
      value={formData.vertical}
      onChange={(e) =>
        setFormData({
          ...formData,
          vertical: e.target.value as Vertical,
        })
      }
      SelectProps={{
        native: true,
      }}
    >
      {Object.values(Vertical).map((vertical) => (
        <option key={vertical} value={vertical}>
          {vertical}
        </option>
      ))}
    </TextField>
  );
};

export default VField;
