import express from "express";
import { body } from "express-validator/check";

import { createPlace } from "../controllers/places/createPlace";
import { getAllPlaces } from "../controllers/places/gatAllPlaces";
import { removePlace } from "../controllers/places/removePlace";
import { updatePlace } from "../controllers/places/updatePlace";
import { getOnePlace } from "../controllers/places/getOnePlace";

const router = express.Router();

router.post(
  "/place",
  [
    body("placeName").isLength({ min: 5 }),
    body("province").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("kindOfPlace").isLength({ min: 5 })
  ],
  createPlace
);
router.get("/place/:placeId", getOnePlace);

router.get("/place", getAllPlaces);

router.delete("/place/:placeId", removePlace);

router.put(
  "/place/:placeId",
  [
    body("placeName").isLength({ min: 5 }),
    body("province").isLength({ min: 5 }),
    body("description").isLength({ min: 5 }),
    body("kindOfPlace").isLength({ min: 5 })
  ],
  updatePlace
);

export default router;
