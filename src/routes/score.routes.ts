import { Router } from "express";
import { getScore, createScore } from "../controllers/score.controller";

const router = Router()

router.get('/scores/:restaurantId', getScore)
router.post('/scores/:restaurantId', createScore)

export default router