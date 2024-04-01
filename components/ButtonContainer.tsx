"use client";
import { useCalendarStore } from "@/store/store";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ButtonContainer() {
  const { name, email, subject, date } = useCalendarStore((state) => state);
  const router = useRouter()

  const handleSubmit = async () => {
    if (!name || !email || !subject || !date) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch("/api/", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, date }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.payload === false) {
        toast.error("Meeting couldn't be booked!", {
          description: `An error has happened. Remember that you can't book two meetings with the same email`,
          action: {
            label: "Close",
            onClick: () => console.log("Close")
          }
        })
        return router.push("/")
      }
      toast("Meeting booked!", {
        description: `Meeting date: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close")
        }
      })
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button variant="default" onClick={() => handleSubmit()}>
      Book Meeting
    </Button>
  );
}
