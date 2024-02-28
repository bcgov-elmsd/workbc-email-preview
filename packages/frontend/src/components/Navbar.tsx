import { useKeycloak } from "@react-keycloak/web";

export function Navbar() {
  const { keycloak, initialized } = useKeycloak();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary-nav ">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand text-bcgold" href="/">
        WorkBC Email Preview
      </a>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <form className="form-inline">
          {keycloak.authenticated && initialized && (
            <a
              className="btn btn-bcgold my-2 my-sm-0"
              href={`https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${keycloak.createLogoutUrl()}&post_logout_redirect_uri=${
                window.location.origin
              }`}
            >
              Logout
            </a>
          )}
        </form>
      </div>
    </nav>
  );
}
