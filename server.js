import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

app.use(express.json()); //to handle data coming from the form

const PORT = process.env.PORT || 8000;

// connect the mongodb
import MongoClient from './src/config/db.js';
MongoClient();

// import routers
import categoryRouter from './src/routers/categoryRouter.js';
import productRouter from './src/routers/productRouter.js';
import userRouter from './src/routers/userRouter.js';
import tokenRouter from './src/routers/tokenRouter.js';

//use routers
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/token', tokenRouter);
app.listen(PORT, (error) => {
  console.log('server running at port 8000');
});
