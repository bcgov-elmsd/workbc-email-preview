import * as express from "express";

interface kAuthRequest extends express.Request {
  kauth: { grant: { [key: string]: { [key: string]: string } } };
}

export const sendEmail = async (req: express.Request, res: express.Response) => {
  console.log((req as kAuthRequest).kauth.grant.access_token?.content);
  if (!(req as kAuthRequest).kauth) {
    return res.status(401).send("Unauthorized");
  }
  res.status(200).send("Email sent");
};
