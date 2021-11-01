import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

const PORT = process.env.PORT || 8000;

// connect the mongodb
import MongoClient from './src/config/db.js';
MongoClient();

// import routers
import categoryRouter from './src/routers/categoryRouter.js';

//use routers
app.use('/api/v1/category', categoryRouter);

app.listen(PORT, (error) => {
  console.log('server running at port 8000');
});
