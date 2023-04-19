import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Slider,
} from "@mui/material";
import { styled } from "@mui/system";

import VIcon from "./assets/check-white.svg";

const marks = [
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
  { value: 15, label: "15" },
];

const StyledContainer = styled(Container)`
  font-family: "Helvetica", sans-serif;
  background-color: #333;
  color: #fff;
  padding: 16px;
`;

const StyledButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #536dfe;
  }
`;

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

const StyledTextField = styled(TextField)`
  label.Mui-focused {
    color: #fff;
  }
  .MuiInputLabel-root {
    color: #fff;
  }
  .MuiInputBase-root {
    color: #fff;
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

const StyledFormLabel = styled(({ ...otherProps }) => (
  <FormLabel {...otherProps} />
))`
  color: #fff;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  color: #fff;
  .MuiRadio-root {
    color: #fff;
  }
`;

const StyledTypography = styled(Typography)`
  color: #fff;
`;

const App = () => {
  const [formData, setFormData] = useState({
    annualRevenue: "",
    currency: "EUR",
    annualGrowthRate: ">150%",
    currentRunway: "6-12 months",
    termLength: 6,
    gracePeriod: "0 months",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSliderChange = (event: any, newValue: any) => {
    setFormData({ ...formData, termLength: newValue });
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <StyledTypography variant="h4" align="center">
          See What You Can Get
        </StyledTypography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <StyledTextField
                  fullWidth
                  required
                  name="annualRevenue"
                  label="Annual recurring revenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <StyledTextField
                  fullWidth
                  required
                  select
                  name="currency"
                  label="Currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                </StyledTextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <StyledTextField
              fullWidth
              required
              select
              name="annualGrowthRate"
              label="Annual growth rate*"
              value={formData.annualGrowthRate}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="<15">&lt;15%</MenuItem>
              <MenuItem value="15_50">15-50%</MenuItem>
              <MenuItem value="50_100">50-100%</MenuItem>
              <MenuItem value="100_150">100-150%</MenuItem>
              <MenuItem value=">150">&gt;150%</MenuItem>
            </StyledTextField>
          </Box>
          <Box sx={{ mt: 3 }}>
            <StyledTextField
              fullWidth
              required
              select
              name="currentRunway"
              label="Current runway*"
              value={formData.currentRunway}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="1-3">1-3 months</MenuItem>
              <MenuItem value="3-6">3-6 months</MenuItem>
              <MenuItem value="6-12">6-12 months</MenuItem>
              <MenuItem value="12-18">12-18 months</MenuItem>
              <MenuItem value=">18">&gt;18 months</MenuItem>
            </StyledTextField>
          </Box>

          <Box sx={{ mt: 3 }}>
            <StyledFormLabel component="legend">
              Term length in months*
            </StyledFormLabel>
            <CustomSlider
              value={formData.termLength}
              min={6}
              max={15}
              step={3}
              marks={marks}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <RadioGroup
              row
              aria-label="Grace Period"
              name="gracePeriod"
              value={formData.gracePeriod}
              onChange={handleChange}
            >
              <StyledFormControlLabel
                value="0"
                control={<Radio />}
                label="0 Months"
              />
              <StyledFormControlLabel
                value="3"
                control={<Radio />}
                label="3 Months"
              />
              <StyledFormControlLabel
                value="6"
                control={<Radio />}
                label="6 Months"
              />
            </RadioGroup>
          </Box>
          <Box sx={{ mt: 3 }}>
            <StyledTextField
              fullWidth
              required
              name="email"
              label="Email*"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <StyledButton type="submit" variant="contained">
              Calculate
            </StyledButton>
          </Box>
        </form>
      </Box>
    </StyledContainer>
  );
};

export default App;
