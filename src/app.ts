import express from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./errorMiddleware";
import notFoundMiddleware from "./notFoundMiddleware";

import sensorApi from "./Api/SensorApi";

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "10mb" }));

app.use("/update-sensor", sensorApi);

app.use(errorMiddleware);
app.use(notFoundMiddleware);

export default app;
