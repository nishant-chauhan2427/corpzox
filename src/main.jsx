import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterConfigration } from "./router/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
  <GoogleOAuthProvider clientId="1028618978770-l4is0dsn2rtk3ig0k15aqgvvhtfd6qas.apps.googleusercontent.com">
    <RouterConfigration />
  </GoogleOAuthProvider>
  </Provider>
  // {/* <App /> */}
  // </StrictMode>,
);
