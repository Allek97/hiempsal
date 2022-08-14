import mongoose from "mongoose";

export interface IAnswer {
    answer: string;
    question: mongoose.Schema.Types.ObjectId;
}
