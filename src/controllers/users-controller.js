const express = require("express");
const router = express.Router();

//imports
const usersManager = require("../managers/users-manager");

router.post("/", async ({ body }, response) => {
  usersManager.add(body);
  return response.end();
});

router.patch("/:email/:verificationNumber", async ({ params }, response) => {
  await usersManager.activateUser(params.email, params.verificationNumber);
  return response.end();
});

module.exports = router;
