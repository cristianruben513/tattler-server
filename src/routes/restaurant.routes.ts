import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant
} from "../controllers/restaurant.controller";

const router = Router()

router.get('/restaurants', getRestaurants)
router.get('/restaurants/:id', getRestaurant)
router.post('/restaurants', createRestaurant)
router.put('/restaurants/:id', updateRestaurant)
router.delete('/restaurants/:id', deleteRestaurant)

export default router