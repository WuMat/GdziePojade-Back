import express from "express";
import { body } from "express-validator/check";

import { createPlace } from "../controllers/places/createPlace";
import { getAllPlaces } from "../controllers/places/gatAllPlaces";

const router = express.Router();

router.post(
  "/post",
  [
    body("placeName").isLength({ min: 5 }),
    body("province").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("kindOfPlace").isLength({ min: 5 })
  ],
  createPlace
);

router.get("/get", getAllPlaces);

export default router;
