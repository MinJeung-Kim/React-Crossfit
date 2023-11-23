import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "./config.js";
import authRoter from "./router/auth.js";
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use("/auth", authRoter);
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});
app.listen(config.port);
//# sourceMappingURL=app.js.map