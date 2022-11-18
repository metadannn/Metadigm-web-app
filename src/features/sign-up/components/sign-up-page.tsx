import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper, { Orientation } from "@mui/material/Stepper";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import logoImage from "../../../assets/img/metadigm-full-logo.svg";
import { MetaCloseButton } from "../../../components/buttons/close/meta-close-button";
import { MetadigmCopyright } from "../../../components/others/metadigm-copyright/metadigm-copyright";
import { useAppSelector } from "../../../configurations/hooks";
import { selectCurrentStep } from "../slices/sign-up-slice";
import { CurrentStepHeader } from "./current-step-header";
import { AccountFormStep } from "./steps/account-form-step";
import { BusinessFormStep } from "./steps/business-form-step";
import { MobileAppFormStep } from "./steps/mobile-app-form-step";

export function SignUpPage(): JSX.Element {
  return (
    <Container disableGutters maxWidth="lg" sx={{ p: "1rem" }}>
      <Grid container>
        <Grid item xs={12} md={2}>
          <CompanyLogo />
        </Grid>
        <Grid item xs={12} md={8}>
          <StepLabels />
          <StepContent />
          <MetadigmCopyright />
        </Grid>
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            order: {
              xs: -1,
              md: 0,
            },
          }}
        >
          <ClosePageButton />
        </Grid>
      </Grid>
    </Container>
  );
}

function CompanyLogo(): JSX.Element {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: {
          xs: "center",
          md: "start",
        },
      }}
    >
      <img src={logoImage} alt="Metadigm Logo" width="75px" />
    </Stack>
  );
}

function StepContent(): JSX.Element {
  return (
    <Box>
      <CurrentStepHeader />
      <Paper variant="outlined" sx={{ mb: "2rem", p: "2rem" }}>
        <CurrentStepComponent />
      </Paper>
    </Box>
  );
}

function StepLabels(): JSX.Element {
  const currentStep = useAppSelector(selectCurrentStep);

  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.up("xs"));
  const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));
  let orientation: Orientation = "horizontal";

  if (matchesXs) {
    orientation = "vertical";
  }

  if (matchesSm) {
    orientation = "horizontal";
  }
  return (
    <Stepper
      activeStep={currentStep}
      orientation={orientation}
      sx={{
        mt: {
          xs: "2rem",
          md: "0.5rem",
        },
        mb: "3rem",
      }}
    >
      <Step>
        <StepLabel>Create an account</StepLabel>
      </Step>
      <Step>
        <StepLabel>Business registration</StepLabel>
      </Step>
      <Step>
        <StepLabel>Mobile app configuration</StepLabel>
      </Step>
    </Stepper>
  );
}

function CurrentStepComponent(): JSX.Element {
  const currentStep = useAppSelector(selectCurrentStep);

  switch (currentStep) {
    case 0:
      return <AccountFormStep />;
    case 1:
      return <BusinessFormStep />;
    case 2:
      return <MobileAppFormStep />;
    default:
      return <AccountFormStep />;
  }
}

function ClosePageButton(): JSX.Element {
  const navigate = useNavigate();

  function goHome(): void {
    navigate("/sign-in");
  }
  return (
    <Stack direction="row" justifyContent="end">
      <MetaCloseButton handleClose={goHome} />
    </Stack>
  );
}
