import { Typography, Box, Grid, useMediaQuery, useTheme } from "@mui/material";

import { styled } from "@mui/system";

const StyledResultContainer = styled(Box)`
  font-family: "Helvetica", sans-serif;
  background-color: #000;
  opacity: 0.85;
  color: #fff;
  padding-top: 2px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 32px;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  margin-top: 80px;
  margin-bottom: 80px;
  padding: 10px;

  @media (max-width: 600px) {
    padding-left: 36px;
    padding-right: 36px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

interface ResultProps {
  loanAmount: number;
  interest: number;
  amortization: number;
}

const Result = ({ loanAmount, interest, amortization }: ResultProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <StyledResultContainer maxWidth="sm">
      <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
        Your quote
      </Typography>
      <Grid container spacing={isMobile ? 1 : 2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Loan Amount</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {loanAmount.toLocaleString()} €
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Fixed upfront interest</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {interest.toLocaleString()} € (
            {((interest / loanAmount) * 100).toFixed(1)}%)
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">Monthly amortization</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body1">
            {amortization.toLocaleString()} €
          </Typography>
          <Typography variant="caption">
            First 3 months amortization free
          </Typography>
        </Grid>
      </Grid>
      <Box mt={isMobile ? 1 : 2}>
        <Typography variant="body2" color="text.secondary">
          The final offer may differ from the estimate subject to your financial
          information.
        </Typography>
      </Box>
    </StyledResultContainer>
  );
};

export default Result;
