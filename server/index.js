const express = require("express");
const app = express();

port = 5000;

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
