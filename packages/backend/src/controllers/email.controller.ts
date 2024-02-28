import * as express from "express";
import { authenticate } from "../auth/authenticate";
import * as emailService from "../services/email.service";

export const sendEmail = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req;
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }
    const user = await authenticate(req.headers);
    if (user.status) {
      console.log(user.status);
      return res.status(user.status).send(user.message);
    }
    if (!body.html || !body.subject || !body.context || !body.email) {
      return res.status(400).send("Bad Request");
    }
    if (user.client_roles && user.client_roles.includes("user")) {
      await emailService.sendEmail(body.html, body.subject, body.context, body.email);
    }
    return res.status(200).send("Email sent");
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
