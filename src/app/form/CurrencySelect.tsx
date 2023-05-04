import React from "react";
import { TextField, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import { Currency } from "@caphub-group/caphub-types";

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: #fff;
  }
  .MuiInputLabel-root {
    color: #fff;
  }
  .MuiInputBase-root {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 6px 12px;
  }
  .MuiInput-underline:before {
    border-bottom-color: #fff;
  }
  .MuiInput-underline:after {
    border-bottom-color: #fff;
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom-color: #fff;
  }
  .MuiSelect-icon {
    color: #fff;
  }
`;

interface CurrencySelectProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ value, onChange }) => {
  const currencies = [];
  for (const currency in Currency) {
    currencies.push(currency);
  }

  return (
    <StyledTextField
      fullWidth
      type="number"
      required
      select
      name="currency"
      label="Currency"
      value={value}
      onChange={(e) => onChange(e.target.value as Currency)}
      sx={{ minWidth: 120 }}
    >
      {currencies.map((currency) => (
        <MenuItem value={currency}>{currency}</MenuItem>
      ))}
    </StyledTextField>
  );
};

export default CurrencySelect;
