import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { Country } from "../types";

const HQCField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      select
      required
      name="headquarterCountry"
      label="Headquarter Country"
      value={formData.headquarterCountry}
      onChange={(e) =>
        setFormData({
          ...formData,
          headquarterCountry: e.target.value as Country,
        })
      }
      SelectProps={{
        native: true,
      }}
    >
      {Object.values(Country).map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </TextField>
  );
};

export default HQCField;
