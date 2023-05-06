import React from "react";
import { Slider } from "@mui/material";
import { styled } from "@mui/system";
import VIcon from "../assets/check-white.svg";
import { FieldProps } from ".";

const CustomSlider = styled(Slider)`
  color: #3f51b5;
  .MuiSlider-valueLabel {
    background-color: #3f51b5;
    color: #fff;
  }
  .MuiSlider-mark {
    background-color: #bfbfbf;
    width: 1px;
    height: 12px;
  }
  .MuiSlider-markLabel {
    color: #fff;
    font-size: 0.875rem;
  }
  .MuiSlider-thumb {
    position: relative;
    background-image: url(${VIcon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 24px;
    height: 24px;
  }
`;

const TermLengthSlider: React.FC<any> = ({ value, onChange }) => {
  const marks = [
    { value: 6, label: "6" },
    { value: 9, label: "9" },
    { value: 12, label: "12" },
    { value: 15, label: "15" },
  ];

  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    onChange(value as number);
  };

  return (
    <CustomSlider
      value={value}
      min={6}
      max={15}
      step={3}
      marks={marks}
      valueLabelDisplay="auto"
      onChange={handleSliderChange}
    />
  );
};

const TPField = ({ formData, setFormData }: FieldProps) => {
  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    setFormData({
      ...formData,
      termLength: Array.isArray(value) ? value[0] : value,
    });
  };

  return (
    <TermLengthSlider value={formData.termLength} onChange={handleChange} />
  );
};

export default TPField;
