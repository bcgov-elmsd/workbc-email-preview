import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import Keycloak from "keycloak-connect";
import emailRoute from "./routes/email.route";

dotenv.config();

const corsOptions = {
  origin: "*" || process.env.OPENSHIFT_NODEJS_ORIGIN_URL || "http://localhost:5173/",
  credentials: true,
  optionsSuccessStatus: 200,
};

const kcConfig = {
  "confidential-port": process.env.AUTH_KEYCLOAK_CONFIDENTIAL_PORT || 0,
  "auth-server-url": process.env.AUTH_KEYCLOAK_SERVER_URL || "",
  resource: process.env.AUTH_KEYCLOAK_CLIENT || "",
  "ssl-required": "",
  "bearer-only": false,
  realm: process.env.AUTH_KEYCLOAK_REALM || "",
  clientSecret: process.env.AUTH_KEYCLOAK_CLIENT_SECRET || "",
  pkceMethod: "S256",
};

const keycloak = new Keycloak({}, kcConfig);

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"));
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use(cors(corsOptions));
app.use(keycloak.middleware());

app.post("/", (req: Request, res: Response) => {
  console.log(req);
  res.send("Express + TypeScript Server");
});

app.use("/email", keycloak.protect(), emailRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
