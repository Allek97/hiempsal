import mongoose, { Schema } from "mongoose";
import { IAnswer } from "server/types/answer";
import Question from "./Question";

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

answerSchema.pre(/^find/, function (next) {
    this.populate("question");
    next();
});

answerSchema.pre("save", async function () {
    await Question.findByIdAndUpdate(this.question, {
        answer: this.answer,
    });
});

const Answer =
    mongoose.models.Answer || mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
