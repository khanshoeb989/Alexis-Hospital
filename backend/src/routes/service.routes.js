import express from "express";
import {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  getServicesByCategory,
  getMedicalServices,
  getCosmetologyServices,
} from "../controllers/service.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";
// import { protect, admin } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * PUBLIC
 */

router.get("/", getAllServices);
router.get("/medical", getMedicalServices);
router.get("/cosmetology", getCosmetologyServices);
router.get("/:id", getSingleService);

router.get("/by-category", getServicesByCategory);




/**
 * ADMIN
 */
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 4 }]),
  createService
);

router.put(
  "/:id",
  upload.fields([{ name: "images", maxCount: 4 }]),
  updateService
);

router.delete("/:id", deleteService);

export default router;
