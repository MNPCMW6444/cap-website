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
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Slider,
} from "@mui/material";
import { styled } from "@mui/system";
import VIcon from "./assets/check-white.svg";
import {
  Currency,
  PositiveNumber,
  WebsiteFormData,
  toPositiveNumber,
} from "@caphub-funding/caphub-types";
import {
  ProvideMainServer,
  MainServerContext,
} from "@caphub-funding/mainserver-provider";
import App from "./App";

const marks = [
  { value: 6, label: "6" },
  { value: 9, label: "9" },
  { value: 12, label: "12" },
  { value: 15, label: "15" },
];

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

const StyledFormControlLabel = styled(FormControlLabel)`
  color: #fff;
  .MuiRadio-root {
    color: #fff;
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

  const handleSliderChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setFormData({
      ...formData,
      termLength: {
        ...formData.termLength,
        amount: (toPositiveNumber(value as number) || 1) as PositiveNumber,
      },
    });
    inner && send();
  };

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
            <Box sx={{ mt: 8 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <StyledTextField
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  name="annualRevenue"
                  type="number"
                  label="Annual recurring revenue"
                  value={formData.annualRevenue?.amount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualRevenue: {
                        ...formData.annualRevenue,
                        amount: (toPositiveNumber(parseInt(e.target.value)) ||
                          1) as PositiveNumber,
                      },
                    })
                  }
                  sx={{ flexGrow: 1 }}
                />
                <StyledTextField
                  fullWidth
                  type="number"
                  required
                  select
                  name="currency"
                  label="Currency"
                  value={formData.annualRevenue?.currency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      annualRevenue: {
                        ...formData.annualRevenue,
                        currency: e.target.value as Currency,
                      },
                    })
                  }
                  sx={{ minWidth: 120 }}
                >
                  <>
                    {currencies.map((currency) => (
                      <MenuItem value={currency}>{currency}</MenuItem>
                    ))}
                  </>
                </StyledTextField>
              </Stack>
            </Box>
            <Box sx={{ mt: 3 }}>
              <StyledTextField
                fullWidth
                type="number"
                required
                select
                name="annualGrowthRate"
                label="Annual growth rate"
                value={formData.annualGrowthRate?.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualGrowthRate: {
                      ...formData.annualGrowthRate,
                      amount: (toPositiveNumber(parseInt(e.target.value)) ||
                        1) as PositiveNumber,
                    },
                  })
                }
              ></StyledTextField>
            </Box>
            <Box sx={{ mt: 3 }}>
              <StyledTextField
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
              ></StyledTextField>
            </Box>
            <Box sx={{ mt: 3 }}>
              <StyledFormLabel>Term length in months</StyledFormLabel>
              <CustomSlider
                value={formData.termLength?.amount}
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gracePeriod: {
                      ...formData.gracePeriod,
                      amount: (toPositiveNumber(parseInt(e.target.value)) ||
                        1) as PositiveNumber,
                    },
                  })
                }
              >
                <StyledFormControlLabel
                  value={0}
                  control={<Radio />}
                  label="0 Months"
                />
                <StyledFormControlLabel
                  value={3}
                  control={<Radio />}
                  label="3 Months"
                />
                <StyledFormControlLabel
                  value={6}
                  control={<Radio />}
                  label="6 Months"
                />
              </RadioGroup>
            </Box>
            {!inner && (
              <Box sx={{ mt: 3 }}>
                <StyledTextField
                  fullWidth
                  required
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Box>
            )}
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
