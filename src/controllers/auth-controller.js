const express = require("express");
const router = express.Router();

//imports
const authManager = require("../managers/auth-manager");
const httpStatusCodes = require("../enums/http-status-codes");

router.post("/", async ({ body }, response) => {
  const operationResult = await authManager.auth(body.email, body.password);
  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).send(operationResult.entity);
});

module.exports = router;
