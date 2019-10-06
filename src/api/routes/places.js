import express from "express";
import { body } from "express-validator/check";

import { createPlace } from "../controllers/places/createPlace";
import { getAllPlaces } from "../controllers/places/gatAllPlaces";
import { removePlace } from "../controllers/places/removePlace";
import { updatePlace } from "../controllers/places/updatePlace";
import { getOnePlace } from "../controllers/places/getOnePlace";

import { isAuth } from "../middleware/is-auth";

const router = express.Router();

const validation = [
  body("placeName").isLength({ min: 5 }),
  body("province").isLength({ min: 5 }),
  body("description").isLength({ min: 5 }),
  body("kindOfPlace").isLength({ min: 5 })
];

router.post("/place", isAuth, [...validation], createPlace);
router.get("/place/:placeId", getOnePlace);

router.get("/place", getAllPlaces);

router.delete("/place/:placeId", isAuth, removePlace);

router.put("/place/:placeId", isAuth, updatePlace);

export default router;
