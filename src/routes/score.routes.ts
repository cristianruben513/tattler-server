import { Router } from "express";
import { getScore, createScore } from "../controllers/score.controller";

const router = Router()

router.get('/score/:restaurantId', getScore)
router.post('/score/:restaurantId', createScore)

export default router