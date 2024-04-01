import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide your username"]
  },
  password: {
    type: String,
    required: [true, "Please provide your email"]
  }
})

export const userModel = models.users || model("users", UserSchema)
