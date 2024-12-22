import express from "express";
import customErrorHandler from "../../error-handler";
import AnnouncementController from "../../controller/AnnouncementController";

const router = express.Router();

router.post(
  "/create",
  customErrorHandler(AnnouncementController.createAnnouncement)
);
router.get("/list", customErrorHandler(AnnouncementController.findAll));
router.get("/get", customErrorHandler(AnnouncementController.findOne));
router.put("/update", customErrorHandler(AnnouncementController.update));
router.delete("/delete", customErrorHandler(AnnouncementController.delete));

router.get("/", (req, res, next) => {
  try {
    res.send("Hello from announcement routes");
  } catch (error) {
    next(error);
  }
});

export default router;
