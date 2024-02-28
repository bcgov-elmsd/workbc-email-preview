import { useKeycloak } from "@react-keycloak/web";

export const useAuthorized = (roles: Array<string>) => {
  const { keycloak } = useKeycloak();
  console.log(keycloak);
  if (keycloak && roles) {
    return roles.some((r: string) => {
      // console.log(keycloak.tokenParsed)
      const realm = keycloak.hasRealmRole(r);
      const resource = keycloak?.tokenParsed?.client_roles?.includes(r);
      return realm || resource;
    });
  }
  return false;
};
