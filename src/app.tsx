import CssNormalize from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { mainTheme } from "./app.theme";
import { store } from "./configurations/store";
import { CheckoutPage } from "./features/checkout/components/checkout-page";
import { CheckoutStatusPage } from "./features/checkout/components/checkout-status-page";
import { HomePage } from "./features/home/components/home-page";
import { SignInPage } from "./features/sign-in/components/sign-in-page";
import { SignUpPage } from "./features/sign-up/components/sign-up-page";
import { ProtectedRoute, UnprotectedRoute } from "./util/protected-route";

export function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <CookiesProvider>
      <CssNormalize>
        <ThemeProvider theme={mainTheme}>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <UnprotectedRoute>
                        <SignInPage />
                      </UnprotectedRoute>
                    }
                  />
                  <Route
                    path="/sign-in"
                    element={
                      <UnprotectedRoute>
                        <SignInPage />
                      </UnprotectedRoute>
                    }
                  />
                  <Route
                    path="/sign-up"
                    element={
                      <UnprotectedRoute>
                        <SignUpPage />
                      </UnprotectedRoute>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/status" element={<CheckoutStatusPage />} />
                </Routes>
              </BrowserRouter>
            </QueryClientProvider>
          </Provider>
        </ThemeProvider>
      </CssNormalize>
    </CookiesProvider>
  );
}
