import type { Request, Response } from "express"

import bcrypt from "bcryptjs"
import { createJWT } from "../libs/jwt"
import User from "../models/user.model"

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body

  const encriptedPass = await bcrypt.hash(password, 10)

  try {
    const newUser = new User({
      username,
      email,
      password: encriptedPass
    })

    const savedUser = await newUser.save()

    const jwt = await createJWT({
      id: savedUser._id,
      email: savedUser.email
    })

    res.cookie("token", jwt)

    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    })
  } catch (err) {
    res.status(500).json({ message: err })
  }
}

export const login = (req: Request, res: Response) => {
  res.send("login")
}