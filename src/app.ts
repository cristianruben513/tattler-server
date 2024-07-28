import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"
import restaurantRoutes from "./routes/restaurant.routes"
import commentRoutes from "./routes/comment.routes"
import scoreRoutes from "./routes/score.routes"
import filterRouter from "./routes/filter.routes"

const app = express()

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', authRoutes)
app.use('/api', restaurantRoutes)
app.use('/api', commentRoutes)
app.use('/api', scoreRoutes)
app.use('/api', filterRouter)

export default app