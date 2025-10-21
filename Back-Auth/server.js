import express from 'express';
import dotenv from 'dotenv';

// importing files 
import connection from './config/db.js';
import authRoutes from './route/authRoutes.js';
dotenv.config();

// creating and using app
const app = express();
app.use(express.json());

// connecting to database
connection();

// using routes
app.use('/auth', authRoutes);

// listeing to server 
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})