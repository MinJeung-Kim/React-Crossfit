import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import authRoter from "./router/auth.js";
import scheduleRoter from "./router/schedule.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

const app = express();

const corsOptions = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/auth", authRoter);
app.use("/schedules", scheduleRoter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// sequelize.sync().then(() => {
//   console.log(`Server is started.... ${new Date()}`);
//   const server = app.listen(config.port);
//   initSocket(server);
// });

sequelize.sync().then(() => {
  console.log(`Server is started.... ${new Date()}`);
  app.listen(config.port);
});
