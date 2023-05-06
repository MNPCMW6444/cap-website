import { Grid } from "@mui/material";
import ARRField from "./ARRField";
import BMField from "./BMField";
import GRField from "./GRField";
import VField from "./VField";
import GMField from "./GMField";
import CRField from "./CRField";
import BSField from "./BSField";
import HQCField from "./HQCField";
import AMField from "./AMField";
import TPField from "./TPField";
import GPField from "./GPField";
import EmailField from "./EmailField";

import {
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
  useCallback,
} from "react";
import { Stack } from "@mui/material";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Currency,
  PositiveNumber,
  WebsiteFormData,
  toPositiveNumber,
} from "@caphub-group/caphub-types";
import {
  ProvideMainServer,
  MainServerContext,
} from "@caphub-group/mainserver-provider";
import App from "./App";
import CurrencySelect from "./form/CurrencySelect";
import GracePeriodRadioGroup from "./form/GracePeriodRadioGroup";
import TermLengthSlider from "./form/TermLengthSlider";

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

const StyledFormLabel = styled(FormLabel)`
  color: #fff;
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
