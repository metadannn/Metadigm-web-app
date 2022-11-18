import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SyntheticEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import logoImage from "../../../assets/img/metadigm-full-logo.svg";
import { useAppDispatch, useAppSelector } from "../../../configurations/hooks";
import { STRIPE_PUBLIC_KEY } from "../../../util/constants";
import { synchronizeEventFn } from "../../../util/syncronize-event-fn";
import { createPaymentSubscription } from "../repositories/checkout-repository";
import { selectClientSecret, selectPlan, setClientSecret } from "../slices/checkout-slice";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export function CheckoutPage(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-evenly" },
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CheckoutCard />
      <Logo />
    </Box>
  );
}

function CheckoutCard(): JSX.Element {
  const dispatch = useAppDispatch();
  const plan = useAppSelector(selectPlan);
  const clientSecret = useAppSelector(selectClientSecret);

  if (plan == null) {
    return <Typography variant="h5">You have to select a plan first</Typography>;
  }

  const createPaymentSubscriptionMutationController = useMutation({
    mutationFn: createPaymentSubscription,
    onSuccess: ({ data: { clientSecret } }) => {
      dispatch(setClientSecret(clientSecret));
    },
    onError: (error) => {
      console.log("An error occurred creating the payment intent", error);
    },
  });

  useEffect(() => {
    createPaymentSubscriptionMutationController.mutate({ planName: plan.name, frequency: plan.frequency });
  }, []);

  const appearance: stripeJs.Appearance = {
    theme: "stripe",
  };
  const options: stripeJs.StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return clientSecret == null ? (
    <BeatLoader />
  ) : (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

function CheckoutForm(): JSX.Element {
  const navigate = useNavigate();

  const plan = useAppSelector(selectPlan);

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();
    if (stripe == null || elements == null) {
      // Stripe.js has not yet loaded.
      return;
    }
    setMessage("");
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/status",
      },
    });

    let errorMessage = "An unexpected error occurred.";
    if (error.message != null && (error.type === "card_error" || error.type === "validation_error")) {
      errorMessage = error.message;
    }
    setMessage(errorMessage);
    setIsLoading(false);
  };

  const syncHandleSubmit = synchronizeEventFn(handleSubmit);

  const handleBack = (): void => {
    navigate(-1);
  };

  return (
    <Card raised sx={{ p: 4, textAlign: "center", order: { xs: 1, md: 0 }, m: "2rem" }}>
      <Stack spacing={3}>
        <Typography variant="h4">Checkout 4242424242424242</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="body1">Plan</Typography>
          <Typography variant="subtitle1">{plan?.title}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="body1">Price</Typography>
          <Typography variant="subtitle1">${plan?.price}</Typography>
        </Stack>
        {message != null && message.length > 0 && (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setMessage("");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Typography variant="body1">{message}</Typography>
          </Alert>
        )}
        <form id="payment-form">
          <PaymentElement id="payment-element" options={{ readOnly: isLoading }} />
          <Stack direction="row" spacing={2} justifyContent="end" sx={{ mt: "2rem" }}>
            <Button variant="outlined" disabled={isLoading} onClick={handleBack}>
              BACK
            </Button>
            <Button
              variant="contained"
              disabled={isLoading || stripe == null || elements == null}
              onClick={syncHandleSubmit}
            >
              {isLoading ? (
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
                  SUBSCRIBING
                  <BeatLoader loading={isLoading} size={5} color="grey" />
                </Box>
              ) : (
                "SUBSCRIBE"
              )}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}

function Logo(): JSX.Element {
  return (
    <Box
      component="img"
      alt="Metadigm Logo"
      src={logoImage}
      sx={{
        width: {
          xs: "50%",
          md: "30%",
        },
      }}
    />
  );
}
