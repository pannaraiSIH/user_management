require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", userRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    app.listen(port, async () => {
      console.log(`starting server on localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
