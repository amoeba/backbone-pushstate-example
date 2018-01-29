const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
const fs = require("fs");

app.use(express.static(__dirname + "/dist"));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "index.html"));
});
app.listen(port);
