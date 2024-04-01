import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import { userModel } from "@/models/UserModel";
import jwt from "jsonwebtoken"

async function authenticateUser(username: string, password: string) {
  connectDB()
  try {
    const user = await userModel.findOne({ username: username, password: password })
    return user
  }
  catch (error) {
    console.error(error)
  }

}

export async function POST(req: Request, res: Response) {
  connectDB()
  const body = await req.json()
  const { username, password } = body

  const user = await authenticateUser(username, password)
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
    expiresIn: "1m"
  })
  return NextResponse.json({ token })
}


