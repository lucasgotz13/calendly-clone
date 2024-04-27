"use client";
import { useCalendarStore } from "@/store/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

export default function FormContainer() {
    const { setName, setEmail, setSubject, setTime } = useCalendarStore(
        (state) => state
    );
    return (
        <section>
            <h2 className="text-4xl font-bold">
                Welcome to Lucas Gotz's{" "}
                <span className="text-primary">Calendly</span>
            </h2>
            <form className="mt-3 space-y-5 flex flex-col items-center">
                <div className="space-y-1">
                    <Label className="font-bold" htmlFor="name">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-bold" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        placeholder="example@mail.com"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-bold" htmlFor="subject">
                        Subject
                    </Label>
                    <Input
                        id="subject"
                        placeholder="Reason for meeting..."
                        type="text"
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label className="font-bold" htmlFor="time">
                        Time
                    </Label>
                    <Select onValueChange={(value) => setTime(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="10:30">10:30</SelectItem>
                                <SelectItem value="11:00">11:00</SelectItem>
                                <SelectItem value="11:30">11:30</SelectItem>
                                <SelectItem value="12:00">12:00</SelectItem>
                                <SelectItem value="12:30">12:30</SelectItem>
                                <SelectItem value="13:00">13:00</SelectItem>
                                <SelectItem value="13:30">13:30</SelectItem>
                                <SelectItem value="14:00">14:00</SelectItem>
                                <SelectItem value="14:30">14:30</SelectItem>
                                <SelectItem value="15:00">15:00</SelectItem>
                                <SelectItem value="15:30">15:30</SelectItem>
                                <SelectItem value="16:00">16:00</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </section>
    );
}
