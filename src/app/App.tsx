import Grid from "@mui/material/Grid";
import Form from "./Form";
import Result from "./Result";
import { useState } from "react";

const App = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interest, setInterest] = useState(0);
  const [amortization, setAmortization] = useState(0);

  return (
    <Grid container direction={{ xs: "column", md: "row" }} spacing={2}>
      <Grid item xs={12} md={6}>
        <Form
          inner
          setLoanAmount={setLoanAmount}
          setInterest={setInterest}
          setAmortization={setAmortization}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Result
          loanAmount={loanAmount}
          interest={interest}
          amortization={amortization}
        />
      </Grid>
    </Grid>
  );
};
export default App;
