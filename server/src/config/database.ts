import mongoose, { ConnectOptions } from "mongoose";


const options: ConnectOptions = {
  dbName: "miracle-morning"
};

mongoose
  .connect("mongodb://127.0.0.1:27017", options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB"));
