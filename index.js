import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import SwaggerDoc from "./config/SwaggerDocs.js";
import oAuthRoute from "./Routes/Authorization/oAuth.js";

const app = express();
config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

SwaggerDoc(app);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/oAuth", oAuthRoute);

app.listen(PORT, () => {
  console.log(`Service has started at localhost:${PORT}`);
});
