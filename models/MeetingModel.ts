import { Schema, model, models } from "mongoose";

const MeetingSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
    },
    subject: {
        type: String,
        required: [true, "Please provide a subject"],
    },
    date: {
        type: Date,
        required: [true, "Please provide a date"],
    },
});

export const meetingModel = models.meetings || model("meetings", MeetingSchema);
