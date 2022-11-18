import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { MetaCloseButton } from "../../../components/buttons/close/meta-close-button";
import { useAppSelector } from "../../../configurations/hooks";
import { selectCurrentStep } from "../slices/sign-up-slice";

export function CurrentStepHeader(): JSX.Element {
  const currentStep = useAppSelector(selectCurrentStep);

  let title: string = "";
  let subtitle: string = "";

  switch (currentStep) {
    case 0:
      title = "Create an account";
      subtitle = "Register by filling in the fields below. Only takes a couple minutes!";
      break;
    case 1:
      title = "Business registration";
      subtitle = "Fill in the fields below for your business. ";
      break;
    case 2:
      title = "Mobile app configuration";
      subtitle = "Fill in the fields below for your business. ";
      break;
  }

  return (
    <Box>
      <PrivacyClosableMessage />
      <Typography variant="h4" sx={{ mb: "1rem" }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: "2rem" }}>
        {subtitle}
      </Typography>
    </Box>
  );
}

function PrivacyClosableMessage(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);

  function closeSection(): void {
    setIsOpen(false);
  }

  let component: JSX.Element | undefined;

  if (isOpen) {
    component = (
      <Paper
        variant="outlined"
        sx={{
          display: "flex",
          backgroundColor: "#F0F2F4",
          mb: "2rem",
          p: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LockIcon
          sx={{
            color: "#79808F",
            mr: "1rem",
          }}
        />
        <Typography variant="body1">
          We take privacy issues seriously. Rest assured that your personal data is securely protected.
        </Typography>
        <MetaCloseButton handleClose={closeSection} />
      </Paper>
    );
  }

  return <>{component}</>;
}
