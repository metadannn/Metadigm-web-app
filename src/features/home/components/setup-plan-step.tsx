import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../configurations/hooks";
import { Plan } from "../../checkout/models/plan";
import { setPlan } from "../../checkout/slices/checkout-slice";
import { setStarterPlan } from "../repositories/user-repository";

const plans = [
  {
    name: "starter",
    title: "Starter",
    monthlyPrice: "0",
    yearlyPrice: "0",
    description: [
      "Free for ever",
      "Mobile / Tablet App Access",
      "$0 Set up Fee",
      "Limit to 10 scans per month",
      "Business / NFT Consulting call",
      "Customer Success Manager",
    ],
    buttonText: "Get Starter",
    buttonVariant: "outlined",
  },
  {
    name: "lite",
    title: "Lite",
    subheader: "Recommended",
    monthlyPrice: "189",
    yearlyPrice: "2.268",
    description: [
      "Mobile / Tablet App Access",
      "No scan limit",
      "250 Scans included per month",
      "$0.35 per scan after",
      "1 hr Consulting Call (total)",
      "Customer Success Manager",
    ],
    buttonText: "Get Lite",
    buttonVariant: "contained",
  },
  {
    name: "pro",
    title: "Pro",
    monthlyPrice: "999",
    yearlyPrice: "11.988",
    description: [
      "Mobile / Tablet App Access",
      "No scan limit",
      "2,000 Scans included per month",
      "$0.20 per scan after",
      "3 hrs Consulting Call (Cumulative)",
      "Customer Success Manager",
    ],
    buttonText: "Get Pro",
    buttonVariant: "outlined",
  },
];

interface SetupPlanProps {
  disableButtons: boolean;
}

export function SetupPlanStep({ disableButtons }: SetupPlanProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectedFrequency, setSelectedFrequency] = useState<"monthly" | "yearly">("monthly");

  const setStarterMutationController = useMutation({
    mutationFn: setStarterPlan,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      navigate("/");
    },
  });

  const handlePlanSelected = (plan: Plan): void => {
    dispatch(setPlan(plan));

    if (plan.name !== "starter") {
      navigate("/checkout");
      return;
    }

    setStarterMutationController.mutate();
  };

  const handleFrequencyChanged = (): void => {
    if (selectedFrequency === "monthly") {
      setSelectedFrequency("yearly");
    } else {
      setSelectedFrequency("monthly");
    }
  };

  return (
    <Box>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }} />
      <Container disableGutters maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Plans and pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Choose the best plan for your business.
        </Typography>
      </Container>
      <Stack direction="row" justifyContent="center" alignItems="baseline" marginBottom="2rem">
        <Typography variant="subtitle1">Monthly</Typography>
        <Switch onChange={handleFrequencyChanged} />
        <Typography variant="subtitle1">Yearly</Typography>
      </Stack>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={2} alignItems="flex-end">
          {plans.map((plan) => (
            <Grid item key={plan.title} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={plan.title}
                  subheader={plan.subheader}
                  titleTypographyProps={{
                    align: "center",
                    variant: "subtitle1",
                  }}
                  subheaderTypographyProps={{
                    align: "center",
                    variant: "subtitle2",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h4" color="text.primary">
                      ${selectedFrequency === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </Typography>
                    <Typography variant="h5" color="text.secondary">
                      {selectedFrequency === "monthly" ? "/mo" : "/yr"}
                    </Typography>
                  </Box>
                  <ul>
                    {plan.description.map((line: string) => (
                      <Stack key={line} component="li" direction="row">
                        {plan.title === "Starter" &&
                        (line === "Business / NFT Consulting call" || line === "Customer Success Manager") ? (
                          <RadioButtonUncheckedIcon sx={{ mr: "1rem" }} />
                        ) : (
                          <CheckCircleOutlineIcon sx={{ mr: "1rem" }} />
                        )}
                        <Typography variant="body2" align="left">
                          {line}
                        </Typography>
                      </Stack>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={plan.buttonVariant as "outlined" | "contained"}
                    onClick={(): void =>
                      handlePlanSelected({
                        title: plan.title,
                        name: plan.name,
                        price: selectedFrequency === "monthly" ? plan.monthlyPrice : plan.yearlyPrice,
                        frequency: selectedFrequency,
                      })
                    }
                    disabled={disableButtons}
                  >
                    {plan.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
