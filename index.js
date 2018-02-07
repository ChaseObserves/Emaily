const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
//   if (err) throw err;
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);