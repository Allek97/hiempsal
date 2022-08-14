import mongoose, { Schema } from "mongoose";
import { IAnswer } from "server/types/answer";

const answerSchema = new Schema<IAnswer>({
    answer: {
        type: String,
        required: [true, "You need to write an answer"],
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "Question",
        required: [true, "Answer must belong to a specific question"],
    },
});

const Answer =
    mongoose.models.Answer || mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
