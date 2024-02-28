import { useKeycloak } from "@react-keycloak/web";
// import { useNavigate } from "react-router-dom"

const NotAuthorized = () => {
  const { keycloak, initialized } = useKeycloak();
  // const navigate = useNavigate()
  return (
    <div>
      {keycloak.authenticated && initialized ? (
        <div>
          <p>Please click on "Home", if the message persists, please contact our team to set up your account</p>
        </div>
      ) : (
        <div>
          <h2>Not logged in, please log in</h2>
          <button type="button" className="btn btn-primary" onClick={() => keycloak.login()}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default NotAuthorized;
