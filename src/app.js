import express from "express";
import { userRouter, taskRouter } from "./routes/index.js";
import cors from 'cors'

// Express App Instence
const app = express();

// App Middlewares
app.use(cors())
app.use(express.json())

// App Routers
app.use(userRouter);
app.use(taskRouter);

// Export Express App Instence
export default app;
