import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import morgan from "morgan"; 
import helmet from "helmet";
import { config } from "./config";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(error);
    res.sendStatus(500);
  }
);

app.listen(config.port);
 