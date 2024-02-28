import { useKeycloak } from "@react-keycloak/web";
import { useAuthorized } from "../auth/auth";
import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  roles: string[];
  children: React.ReactNode;
}

function PrivateRoute(props: Readonly<Props>) {
  const { keycloak, initialized } = useKeycloak();

  if (useAuthorized(props.roles)) {
    return <>{props.children}</>;
  }
  return keycloak && initialized ? (
    <Navigate to="/notAuthorized" />
  ) : (
    <div>
      <p className="tw-text-4xl tw-text-center ">Loading</p>
    </div>
  );
}
export default PrivateRoute;
