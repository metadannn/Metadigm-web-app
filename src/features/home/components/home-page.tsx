import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { UserPlanIsRequiredError } from "../../../util/errors";
import { synchronizeEventFn } from "../../../util/syncronize-event-fn";
import { getUserPlan, logout } from "../repositories/user-repository";
import { SetupPlanStep } from "./setup-plan-step";

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingLogout,
    isRefetching: isRefetchingLogout,
    refetch: refetchLogout,
  } = useQuery("logout", logout, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const showLogoutLoader = isLoadingLogout || isRefetchingLogout;

  const { isLoading, isError, data, error } = useQuery("userPlan", getUserPlan, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  let content: JSX.Element;

  if (isError) {
    if (error instanceof UserPlanIsRequiredError) {
      content = <SetupPlanStep disableButtons={showLogoutLoader} />;
    } else {
      content = <Typography variant="h6">An unexpected error occurred</Typography>;
    }
  } else {
    const plan = data?.data.name != null ? data?.data.name : "";

    content = (
      <Stack justifyContent="center" alignItems="center">
        {isLoading ? <AccountVerificationLoader /> : <UserContent plan={plan} />}
      </Stack>
    );
  }

  const asyncLogout = async (e: SyntheticEvent): Promise<void> => {
    await refetchLogout();
  };

  const handleLogout = synchronizeEventFn(asyncLogout);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
      <Stack minHeight="100vh" justifyContent="center">
        <Paper variant="outlined" sx={{ m: "2rem", p: "2rem" }}>
          {content}
          {!isLoading && (
            <Stack direction="row" justifyContent="end" marginTop="2rem">
              <Button variant="outlined" disabled={showLogoutLoader} onClick={handleLogout}>
                {showLogoutLoader ? (
                  <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "baseline" }}>
                    Logging out
                    <BeatLoader loading={showLogoutLoader} size={5} color="grey" />
                  </Box>
                ) : (
                  "Logout"
                )}
              </Button>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}

interface UserContentProps {
  plan: string;
}

function UserContent({ plan }: UserContentProps): JSX.Element {
  return <Typography variant="h6">{`Your plan is ${plan}`}</Typography>;
}

function AccountVerificationLoader(): JSX.Element {
  return (
    <Stack direction="row" gap={1} alignItems="baseline">
      <Typography variant="h6">We are verifying your account, please wait a second</Typography>
      <BeatLoader size={8} />
    </Stack>
  );
}
