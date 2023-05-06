import { PositiveNumber, toPositiveNumber } from "@caphub-group/caphub-types";
import { TextField } from "@mui/material";
import { FieldProps } from ".";

const ARRField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      required
      InputLabelProps={{
        shrink: true,
      }}
      name="annualRevenue"
      type="number"
      label="Annual recurring revenue"
      value={formData.annualRevenue?.amount}
      onChange={(e) =>
        setFormData({
          ...formData,
          annualRevenue: {
            ...formData.annualRevenue,
            amount: (toPositiveNumber(parseInt(e.target.value)) ||
              1) as PositiveNumber,
          },
        })
      }
    />
  );
};

export default ARRField;
