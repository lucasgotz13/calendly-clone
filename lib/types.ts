import { ObjectId } from "mongoose";

export interface Meeting {
    _id: any;
    name: string;
    email: string;
    subject: string;
    date: Date;
    __v: 0;
}
