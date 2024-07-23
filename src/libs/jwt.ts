import jwt from "jsonwebtoken"

import { SECRET } from "../config"

export function createJWT(payload: any) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET,
      { expiresIn: '4d' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}