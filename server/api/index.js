if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express")
const app = express()
const port = 5000
const mongoose = require('mongoose');

mongoose.set("strictQuery", true);

const options ={
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

const dbUrl = process.env.MONGODB_URI_PROD || "mongodb://127.0.0.1:27017/wordle"
// Connect to MongoDB
mongoose
  .connect(dbUrl,options)
  .then(() => {
    console.log("Data base Connection Open!!");
  })
  .catch(() => {
    console.log("Error in Connecting Data Base");
  });



app.get("/", (req, res) => {
    res.send("Hello from sever")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})