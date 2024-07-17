require('dotenv').config();
import { connectToDatabase } from "./config/db_connection";
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { usersRouter } from "./routes/userRoute";
import { tokenChecker } from "./middleware/token_checker";
import { questionsRouter } from "./routes/questionRoute";

const app: Application = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// for development
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); 
};
app.use('/users', loggerMiddleware, usersRouter, tokenChecker);
app.use('/questions', loggerMiddleware, questionsRouter)

const listenForRequests = (): void => {
    const port : string | undefined = process.env.PORT;

    if (!port) {
        throw new Error('PORT environment variable is not set');
    }
    app.listen(parseInt(port), () => {
        console.log("Now listening on port", port);
    });
};

connectToDatabase().then(() => {
    listenForRequests();
});


export default app;