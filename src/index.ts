import app from "./app";

import { PORT } from "./config";
import { ConnectDB } from "./db";

ConnectDB()

app.listen(PORT)

console.log(`Server running in the port ${PORT}`)