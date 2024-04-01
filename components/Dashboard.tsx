"use client";
import Image from "next/image";
import { MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Meeting } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function Dashboard({ meetings }: { meetings: Meeting[] }) {
  const [isPending, setIsPending] = useState<boolean>(true);
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token")
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    setIsPending(false);

    const validateToken = async () => {
      try {
        const res = await fetch("/api/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Token validation failed");
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    };
    validateToken();
  }, [router]);

  if (!meetings || isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                <Link href={"/"} onClick={() => handleLogout()}>Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary font-bold">
                Meetings
              </CardTitle>
              <CardDescription>
                Manage your meetings
              </CardDescription>
            </CardHeader>
            <CardContent>
              {meetings.length === 0 ? (
                <h1 className="text-2xl text-primary text-center font-bold">
                  NO MEETINGS
                </h1>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden md:table-cell">
                        Name
                      </TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Subject
                      </TableHead>
                      <TableHead>Meeting Date</TableHead>
                      <TableHead>
                        <span className="sr-only">
                          Actions
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meetings.map((meeting) => (
                      <TableRow key={meeting._id}>
                        <TableCell className="font-medium hidden md:table-cell">
                          {meeting.name}
                        </TableCell>
                        <TableCell>
                          {meeting.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {meeting.subject}
                        </TableCell>
                        <TableCell>
                          {meeting.date.toLocaleDateString(
                            "es-ar"
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              asChild
                            >
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">
                                  Toggle menu
                                </span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center">
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDelete(
                                    meeting._id
                                  )
                                }
                              >
                                <Trash2
                                  size={20}
                                  className="mr-2"
                                  color="red"
                                />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
