import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import connection from './config/connection';
import errorMiddleware from './middleware/errorMiddleware';
import corsMiddleware from './config/cors';
import routes from './routes';
connection.connect();

const app: Express = express();
// Constants
const PORT = process.env.PORT || 3000;

// Middlewares
// app.use(corsMiddleware);
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', routes);

app.use('/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'The requested resource was not found',
  });
});
//Global Error handling middleware
app.use(errorMiddleware);
// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
