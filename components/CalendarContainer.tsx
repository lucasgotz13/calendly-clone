"use client";
import ButtonContainer from "./ButtonContainer";
import { Calendar } from "./ui/calendar";
import { useCalendarStore } from "@/store/store";

export default function CalendarContainer() {
    const setDate = useCalendarStore((state) => state.setDate);
    const date = useCalendarStore((state) => state.date);

    const handleSelect = (e: Date | undefined) => {
        setDate(e);
    };
    return (
        <>
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                className="max-w-fit rounded-md border"
            />
            <ButtonContainer />
        </>
    );
}
