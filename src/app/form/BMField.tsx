import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { BusinessModel } from "../types";

const BMField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      select
      required
      name="businessModel"
      label="Business Model"
      value={formData.businessModel}
      onChange={(e) =>
        setFormData({
          ...formData,
          businessModel: e.target.value as BusinessModel,
        })
      }
      SelectProps={{
        native: true,
      }}
    >
      {Object.values(BusinessModel).map((model) => (
        <option key={model} value={model}>
          {model}
        </option>
      ))}
    </TextField>
  );
};

export default BMField;
