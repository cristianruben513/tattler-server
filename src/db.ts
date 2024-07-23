import mongoose from "mongoose"

export const DATABASE_URI = `mongodb+srv://cristian:0gPJ6p6dqojjm1uB@cluster0.ci1udsg.mongodb.net/cluster0`

export async function ConnectDB() {
  try {
    await mongoose.connect(DATABASE_URI)
    console.log("Database connected")
  } catch (e) {
    console.log(e)
  }
}