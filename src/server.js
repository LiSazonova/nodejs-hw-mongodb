//В ньому буде знаходитись логіка роботи вашого express-серверу.

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

app.use(cors());

const app = express();

app.use(
    pino({
        transport: {
            target: 'pino-pretty',
        },
    }),
);