import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import { meetingModel } from "@/models/MeetingModel";

export async function POST(req: Request, res: Response) {
  connectDB();
  const { name, email, subject, date } = await req.json();
  console.log({ name, email, subject, date });
  try {
    let result = await meetingModel.create({ name, email, subject, date });
    return NextResponse.json({
      message: "Objeto creado",
      payload: result,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ status: "error", payload: false })
  }
}

export async function DELETE(request: any) {
  connectDB();
  const { id } = await request.json();
  let result = await meetingModel.findByIdAndDelete(id);
  return NextResponse.json({
    message: "Objeto eliminado",
    payload: result,
  });
}
