const express = require("express");
const app = express();

//imports
const port = process.env.PORT || 30001;
const usersController = require("./controllers/users-controller");

//middlewars
app.use(express.json());

//routes
app.use("/users", usersController);

//initialize server
app.listen(port, () => {
  console.log("prueba", port);
});
