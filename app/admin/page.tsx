import { meetingModel } from "@/models/MeetingModel";
import connectDB from "@/utils/mongoose";
import { Meeting } from "@/lib/types";
import { Dashboard } from "@/components/Dashboard";

const loadMeetings = async () => {
  connectDB();
  const meetings: Meeting[] = await meetingModel.find().lean();
  return meetings;
};

export default async function Home() {
  const meetings = await loadMeetings();

  return <Dashboard meetings={meetings} />;
}
