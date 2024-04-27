import CalendarContainer from "@/components/CalendarContainer";
import FormContainer from "@/components/FormContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
    return (
        <main className="dark p-10 space-y-5 flex flex-col">
            <Button variant="outline" className="ml-auto">
                <Link href={"/login"}>Admin</Link>
            </Button>
            <div className="flex flex-col items-center justify-center gap-5">
                <FormContainer />
                <CalendarContainer />
            </div>
        </main>
    );
}
