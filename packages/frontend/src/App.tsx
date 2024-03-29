import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import MainRouter from "./Router";

const keycloak = new Keycloak({
  realm: import.meta.env.VITE_APP_KEYCLOAK_REALM || "",
  url: import.meta.env.VITE_APP_KEYCLOAK_URL || "",
  clientId: import.meta.env.VITE_APP_KEYCLOAK_CLIENT_ID || "",
});

const keycloakProviderInitConfig = {
  // onLoad: 'check-sso',
  pkceMethod: "S256",
  enableLogging: true,
};

const eventLogger = (event: unknown, error: unknown) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens: unknown) => {
  console.log("onKeycloakTokens", tokens);
};

function App() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={keycloakProviderInitConfig}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <Router>
        <ToastContainer />
        <Navbar />
        <MainRouter />
        <Footer />
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
