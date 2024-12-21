import express from "express";
import customErrorHandler from "../../error-handler";
import UserController from "../../controller/UserController";

const router = express.Router();

router.post("/login", customErrorHandler(UserController.login));
router.post("/register", customErrorHandler(UserController.register));

router.get("/", (req, res, next) => {
  try {
    res.send("Hello from user routes");
  } catch (error) {
    next(error);
  }
});

export default router;
