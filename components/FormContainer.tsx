"use client";
import { useCalendarStore } from "@/store/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function FormContainer() {
    const { setName, setEmail, setSubject } = useCalendarStore(
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
            </form>
        </section>
    );
}
