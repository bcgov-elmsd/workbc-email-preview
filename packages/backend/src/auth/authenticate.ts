import axios from "axios";
import { Request } from "express";

// create typings from these please
type User = {
  status?: number;
  message?: string;
  client_roles?: string[];
  idir_user_guid?: string;
  sub?: string;
  idir_username?: string;
  email_verified?: string;
  name?: string;
  preferred_username?: string;
  display_name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
};

export const authenticate = async (headers: Request["headers"]): Promise<User> => {
  // send a request to the userinfo endpoint on keycloak
  const response = await axios
    .get(
      `${process.env.AUTH_KEYCLOAK_SERVER_URL}/realms/${process.env.AUTH_KEYCLOAK_REALM}/protocol/openid-connect/userinfo`,
      {
        method: "GET",
        headers: {
          // add the token you received to the userinfo request, sent to keycloak
          authorization: headers.authorization, // Fix: Use lowercase 'authorization'
        },
      }
    )
    .then((response) => {
      if (response.status !== 200) {
        return { status: 401, message: "Unauthorized" };
      }
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return { status: 500, message: "Internal Server Error" };
    });
  return response;
};
