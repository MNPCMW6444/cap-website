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
  FormControl,
  Slider,
  FormLabel,
  Radio,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)`
  font-family: "Helvetica", sans-serif;
`;

const StyledButton = styled(Button)`
  background-color: #333;
  color: white;
  &:hover {
    background-color: #555;
  }
`;

const marks = [
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
  { value: 15, label: "15" },
];

const App = () => {
  const [formData, setFormData] = useState({
    annualRevenue: "",
    currency: "EUR",
    annualGrowthRate: ">150%",
    currentRunway: "6-12 months",
    termLength: "",
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
        <Typography variant="h4" align="center">
          See What You Can Get
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  required
                  name="annualRevenue"
                  label="Annual recurring revenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
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
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
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
            </TextField>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
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
            </TextField>
          </Box>
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Term length in months*</FormLabel>
            </FormControl>
            <Slider
              value={formData.termLength as any}
              min={6}
              max={15}
              step={3}
              marks={marks}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              required
              select
              name="gracePeriod"
              label="Grace period"
              value={formData.gracePeriod}
              onChange={handleChange}
            >
              <MenuItem value="0 months">0 months</MenuItem>
              <MenuItem value="3 months">3 months</MenuItem>
              <MenuItem value="6 months">6 months</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mt: 3 }}>
            <TextField
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
              Submit
            </StyledButton>
          </Box>
        </form>
      </Box>
    </StyledContainer>
  );
};

export default App;
