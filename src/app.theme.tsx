import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let mainTheme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Helvetica", sans-serif`,
    h1: {
      fontSize: 93,
      fontWeight: 600,
      letterSpacing: -1.5,
    },
    h2: {
      fontSize: 58,
      fontWeight: 600,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 46,
      fontWeight: 600,
    },
    h4: {
      fontSize: 33,
      fontWeight: 600,
      letterSpacing: -0.1,
    },
    h5: {
      fontSize: 23,
      letterSpacing: -0.1,
      fontWeight: 600,
    },
    h6: {
      fontSize: 19,
      fontWeight: 600,
      letterSpacing: -0.1,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: 0.1,
    },
    subtitle2: {
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: 0.08,
    },
    body1: {
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: 0.5,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
      letterSpacing: 0.25,
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1.2,
    },
    caption: {
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0.4,
    },
    overline: {
      fontSize: 10,
      fontWeight: 400,
      letterSpacing: 1.5,
    },
  },
});

mainTheme = responsiveFontSizes(mainTheme);

export { mainTheme };
