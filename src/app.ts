import express from "express"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"
import restaurantRoutes from "./routes/restaurant.routes"
import commentRoutes from "./routes/comment.routes"
import scoreRoutes from "./routes/score.routes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', restaurantRoutes)
app.use('/api', commentRoutes)
app.use('/api', scoreRoutes)

export default app