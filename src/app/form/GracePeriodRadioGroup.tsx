import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControlLabel = styled(FormControlLabel)`
  color: #fff;
  .MuiRadio-root {
    color: #fff;
  }
`;

interface GracePeriodRadioGroupProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GracePeriodRadioGroup: React.FC<GracePeriodRadioGroupProps> = ({
  value,
  onChange,
}) => {
  return (
    <RadioGroup
      row
      aria-label="Grace Period"
      name="gracePeriod"
      value={value}
      onChange={(event) => onChange(event)}
    >
      <StyledFormControlLabel value={0} control={<Radio />} label="0 Months" />
      <StyledFormControlLabel value={3} control={<Radio />} label="3 Months" />
      <StyledFormControlLabel value={6} control={<Radio />} label="6 Months" />
    </RadioGroup>
  );
};

export default GracePeriodRadioGroup;
