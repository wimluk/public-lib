// Required External Modules

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import validateEnv from '@/utils/validateEnv';
import router from '@/routers/routes';
import usersRouter from '@/routers/users.routes';
import authRouter from '@/routers/auth.routes';
import errorMiddleware from '@middlewares/error.middleware';

// App Variables

dotenv.config();

validateEnv();

const port = process.env.PORT;

// App Configuration

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

// Routes

app.use('/', router);
app.use('/', usersRouter);
app.use('/', authRouter);

// Server Activation

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
