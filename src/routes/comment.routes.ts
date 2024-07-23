import { Router } from "express";
import { createComment, getComments } from "../controllers/comment.controller";

const router = Router()

router.get('/comments/:restaurantId', getComments)
router.post('/comments/:restaurantId', createComment)

export default router