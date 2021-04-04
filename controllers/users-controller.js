const express = require("express");
const router = express.Router();

//imports
const usersManager = require("../managers/users-manager");

router.post("/", async (request, response) => {
  usersManager.add({});
  return response.end();
});

module.exports = router;
