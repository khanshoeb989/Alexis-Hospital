import express from "express"
import{
    createService,
    deleteService,
    getAllServices,
    getCosmetologyServices,
    getMedicalServices,
    getServiceBySlug,
    updateService,

} from "../controllers/serviceDetails.controllers.js"

import {upload } from "../middlewares/multer.middlewares.js"

const router = express.Router();

router.get("/",getAllServices);
router.get("/cosmetology", getCosmetologyServices);
router.get("/medical", getMedicalServices);



router.put(
    "/:id",
    // isAdmin,
    upload.fields([{name: "images", maxCount: 4}]),
    updateService
  );

router.get("/:slug", getServiceBySlug);

router.delete(
    "/:id",
    // isAdmin,
    deleteService
  );

  router.post(
    "/",
    upload.fields([{ name: "images", maxCount: 4 }]),
    createService
  );

 

export default router;