import { PositiveNumber, toPositiveNumber } from "@caphub-group/caphub-types";
import { TextField } from "@mui/material";
import { FieldProps } from ".";

const CRField = ({ formData, setFormData }: FieldProps) => {
  return (
    <TextField
      fullWidth
      type="number"
      required
      select
      name="currentRunway"
      label="Current runway"
      value={formData.currentRunway?.amount}
      onChange={(e) =>
        setFormData({
          ...formData,
          currentRunway: {
            ...formData.currentRunway,
            amount: (toPositiveNumber(parseInt(e.target.value)) ||
              1) as PositiveNumber,
          },
        })
      }
    />
  );
};

export default CRField;
