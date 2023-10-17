const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
