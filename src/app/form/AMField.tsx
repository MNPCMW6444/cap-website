import React from "react";
import { TextField } from "@mui/material";
import { FieldProps } from ".";
import { NumAndUnit, Unit } from "@caphub-group/caphub-types";

const AMField = ({ formData, setFormData }: FieldProps) => {
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    const newNumAndUnit: NumAndUnit = {
      ...formData.annualGrowthRate,
      amount: amount > 0 ? amount : 0,
    };
    setFormData({ ...formData, annualGrowthRate: newNumAndUnit });
  };

  const handleUnitChange = (event: any) => {
    const newNumAndUnit: NumAndUnit = {
      ...formData.annualGrowthRate,
      unit: event.target.value as Unit,
    };
    setFormData({ ...formData, annualGrowthRate: newNumAndUnit });
  };

  return (
    <>
      <TextField
        fullWidth
        required
        type="number"
        name="annualGrowthRateAmount"
        label="Annual Growth Rate Amount"
        value={formData.annualGrowthRate.amount}
        onChange={handleAmountChange}
      />
      <TextField
        fullWidth
        select
        required
        name="annualGrowthRateUnit"
        label="Annual Growth Rate Unit"
        value={formData.annualGrowthRate.unit}
        onChange={handleUnitChange}
        SelectProps={{
          native: true,
        }}
      >
        {Object.values(Unit).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
    </>
  );
};

export default AMField;
