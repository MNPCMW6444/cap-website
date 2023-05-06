import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { Period, TimeUnit } from "@caphub-group/caphub-types";

const GPField = ({ formData, setFormData }: FieldProps) => {
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    const newPeriod: Period = {
      ...formData.gracePeriod,
      amount: amount > 0 ? amount : 0,
    };
    setFormData({ ...formData, gracePeriod: newPeriod });
  };

  const handleUnitChange = (event: any) => {
    const newPeriod: Period = {
      ...formData.gracePeriod,
      unit: event.target.value as TimeUnit,
    };
    setFormData({ ...formData, gracePeriod: newPeriod });
  };

  return (
    <>
      <TextField
        fullWidth
        required
        type="number"
        name="gracePeriodAmount"
        label="Grace Period Amount"
        value={formData.gracePeriod?.amount}
        onChange={handleAmountChange}
      />
      <TextField
        fullWidth
        select
        required
        name="gracePeriodUnit"
        label="Grace Period Unit"
        value={formData.gracePeriod?.unit}
        onChange={handleUnitChange}
        SelectProps={{
          native: true,
        }}
      >
        {Object.values(TimeUnit).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
    </>
  );
};

export default GPField;
