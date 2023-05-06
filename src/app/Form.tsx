import { Grid } from "@mui/material";
import ARRField from "./form/ARRField";
import BMField from "./form/BMField";
import GRField from "./form/GRField";
import VField from "./form/VField";
import GMField from "./form/GMField";
import CRField from "./form/CRField";
import BSField from "./form/BSField";
import HQCField from "./form/HQCField";
import AMField from "./form/AMField";
import TPField from "./form/TPField";
import GPField from "./form/GPField";
import EmailField from "./form/EmailField";

import {
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  useCallback,
} from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { Currency, WebsiteFormData } from "@caphub-group/caphub-types";
import {
  ProvideMainServer,
  MainServerContext,
} from "@caphub-group/mainserver-provider";
import App from "./App";
const StyledContainer = styled(Container)`
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

const StyledButton = styled(Button)`
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #536dfe;
  }
`;

const StyledTypography = styled(Typography)`
  color: #fff;
`;

interface ActionStateType {
  DOING: string;
  IDLE: string;
}

const ACTION_STATES: ActionStateType = {
  DOING: "Calculating",
  IDLE: "Calculate",
};

interface FormProps {
  inner?: boolean;
  setLoanAmount?: Dispatch<SetStateAction<number>>;
  setInterest?: Dispatch<SetStateAction<number>>;
  setAmortization?: Dispatch<SetStateAction<number>>;
}

const Form = ({
  inner,
  setLoanAmount,
  setInterest,
  setAmortization,
}: FormProps) => {
  const [formData, setFormData] = useState<WebsiteFormData>(
    {} as WebsiteFormData
  );

  const [action, setAction] = useState<keyof ActionStateType>("IDLE");
  const [full, setFull] = useState<boolean>(false);

  const axiosInstance = useContext(MainServerContext);

  const send = useCallback(() => {
    axiosInstance
      .post("website/calculate", {
        stringifiedFormData: JSON.stringify(formData),
      })
      .then((res) => {
        setAction("IDLE");
        if (inner) {
          setLoanAmount && setLoanAmount(res?.data?.loanAmount || 0);
          setInterest && setInterest(res?.data?.interest || 0);
          setAmortization && setAmortization(res?.data?.amortization || 0);
        } else setFull(true);
      });
  }, [
    axiosInstance,
    formData,
    inner,
    setAmortization,
    setInterest,
    setLoanAmount,
  ]);

  useEffect(() => {
    inner && send();
  }, [formData, inner, send]);

  const sendForm = () => {
    setAction("DOING");
    try {
      send();
    } catch (e) {
      setAction("IDLE");
    }
  };

  const currencies = [];
  for (const currency in Currency) {
    currencies.push(currency);
  }

  return full ? (
    <App />
  ) : (
    <ProvideMainServer>
      <StyledContainer maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <StyledTypography variant="h4" align="center">
            See What You Can Get
          </StyledTypography>
          <form>
            return (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ARRField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BMField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GRField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <VField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GMField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CRField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BSField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <HQCField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AMField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TPField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <GPField formData={formData} setFormData={setFormData} />
              </Grid>
              <Grid item xs={12}>
                <EmailField formData={formData} setFormData={setFormData} />
              </Grid>
            </Grid>
            );
            {!inner && (
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <StyledButton onClick={sendForm} variant="contained">
                  {ACTION_STATES[action]}
                </StyledButton>
              </Box>
            )}
          </form>
        </Box>
      </StyledContainer>
    </ProvideMainServer>
  );
};

export default Form;
