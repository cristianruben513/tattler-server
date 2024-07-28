import { Router } from "express";
import { searchRestaurant } from "../controllers/filter.controller";
import { getDistance } from "../controllers/geolocalization.controller";

const router = Router()

router.get('/search', searchRestaurant)
router.get('/distance', getDistance)

export default router