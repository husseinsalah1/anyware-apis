import express from "express";
import customErrorHandler from "../../error-handler";
import QuizController from "../../controller/QuizController";

const router = express.Router();

router.post("/create", customErrorHandler(QuizController.createQuiz));
router.get("/list", customErrorHandler(QuizController.findAll));
router.get("/get", customErrorHandler(QuizController.findOne));
router.put("/update", customErrorHandler(QuizController.update));
router.delete("/delete", customErrorHandler(QuizController.delete));

router.get("/", (req, res, next) => {
  try {
    res.send("Hello from user routes");
  } catch (error) {
    next(error);
  }
});

export default router;
