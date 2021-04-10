const express = require("express");
const router = express.Router();

//imports
const usersManager = require("../managers/users-manager");
const httpStatusCodes = require("../enums/http-status-codes");
const authorize = require("../middlewars/jwt-middlewar");

router.get("/:email", authorize, async ({ params }, response) => {
  const operationResult = await usersManager.get(params.email);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).json(operationResult.entity);
});

router.post("/", async ({ body }, response) => {
  const operationResult = await usersManager.add(body);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.created).end();
});

router.patch("/:email", authorize, async ({ body }, response) => {
  const operationResult = await usersManager.update(body);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).end();
});

router.delete("/:email", authorize, async ({ params }, response) => {
  const operationResult = await usersManager.deletetion(params.email);

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.status(httpStatusCodes.ok).end();
});

router.get("/:email/:verificationNumber", async ({ params }, response) => {
  const operationResult = await usersManager.activateUser(
    params.email,
    params.verificationNumber
  );

  if (operationResult.error) {
    return response
      .status(httpStatusCodes.badRequest)
      .send(operationResult.error);
  }

  return response.end();
});

module.exports = router;
