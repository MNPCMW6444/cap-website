import { PositiveNumber, toPositiveNumber } from "@caphub-group/caphub-types";
import { TextField } from "@mui/material";
import { FieldProps } from ".";

const GRField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      type="number"
      required
      select
      name="annualGrowthRate"
      label="Annual growth rate"
      value={formData.annualGrowthRate?.amount}
      onChange={(e) =>
        setFormData({
          ...formData,
          annualGrowthRate: {
            ...formData.annualGrowthRate,
            amount: (toPositiveNumber(parseInt(e.target.value)) ||
              1) as PositiveNumber,
          },
        })
      }
    />
  );
};

export default GRField;
