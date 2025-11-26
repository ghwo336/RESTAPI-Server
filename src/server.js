import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './database.js';
import studentRoutes from './routes/studentRoutes.js';
import {errorHandler} from './middleware/errorHandler.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
connectDB();
app.use('/students', studentRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
