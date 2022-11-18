import { Button, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import * as stripeJs from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import logoImage from "../../../assets/img/metadigm-full-logo.svg";
import { STRIPE_PUBLIC_KEY } from "../../../util/constants";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export function CheckoutStatusPage(): JSX.Element {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const clientSecret = urlSearchParams.get("payment_intent_client_secret");

  if (clientSecret == null) {
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
        <Typography variant="h6">There is no payment to check.</Typography>
        <Logo />
      </Box>
    );
  }

  const appearance: stripeJs.Appearance = {
    theme: "stripe",
  };
  const options: stripeJs.StripeElementsOptions = {
    clientSecret,
    appearance,
  };

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
      <Elements options={options} stripe={stripePromise}>
        <CheckoutCard />
      </Elements>
      <Logo />
    </Box>
  );
}

function CheckoutCard(): JSX.Element {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    navigate("/home");
  };

  const stripe = useStripe();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (stripe == null) {
      return;
    }
    const urlSearchParams = new URLSearchParams(window.location.search);
    const clientSecret = urlSearchParams.get("payment_intent_client_secret");

    if (clientSecret == null) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      })
      .catch((error) => {
        setMessage("Something went wrong fetching the status of your payment.");
        console.log("An error occurred while fetching the payment intent", error);
      });
  }, [stripe]);

  return message.length === 0 ? (
    <BeatLoader />
  ) : (
    <Card raised sx={{ p: 4, textAlign: "center", order: { xs: 1, md: 0 }, m: "2rem" }}>
      <Typography variant="h5" sx={{ mb: "2rem" }}>
        Payment status
      </Typography>
      <Stack direction="row" justifyContent="start">
        <Typography variant="body1">{message}</Typography>
      </Stack>
      <Button variant="contained" sx={{ mt: "2rem" }} onClick={handleGoHome}>
        GO HOME
      </Button>
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
