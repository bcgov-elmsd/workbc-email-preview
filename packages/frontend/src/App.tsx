import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from "@react-keycloak/web";

// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import MainRouter from "./Router";

const keycloak = new Keycloak("../keycloak.json");

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
        <Navbar />
        <MainRouter />
        <Footer />
      </Router>
    </ReactKeycloakProvider>
  );
}

export default App;
