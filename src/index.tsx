import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import { Amplify } from "aws-amplify";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import awsExports from "./aws-exports";
import reportWebVitals from "./reportWebVitals";

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<App />);

reportWebVitals().catch((e) => console.error("error starting 'reportWebVitals' -> %s", e));
