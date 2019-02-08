import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const DBNAME = process.env.DB_NAME;
const DBPASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb://${DBNAME}:${DBPASSWORD}@ds125945.mlab.com:25945/gdziepojadepl`,
    { useNewUrlParser: true }
  )
  .then(result => console.log("database is connected"))
  .catch(err => console.log(err));

const app = express();

console.log("dziala");

export default app;
