import mongoose, { Schema } from "mongoose";

import { IQuestion } from "server/types/question";
import validator from "validator";
import Answer from "./Answer";

const questionSchema = new Schema<IQuestion>({
    question: {
        type: String,
        required: [true, "Question field cannot be empty"],
    },
    name: {
        type: String,
        required: [true, "Your name is required"],
    },
    email: {
        type: String,
        required: [true, "You need to provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "You need to provide a valid email"],
    },
    answer: {
        type: String,
        default: "",
        required: false,
    },
});

const Question =
    mongoose.models.Question ||
    mongoose.model<IQuestion>("Question", questionSchema);

questionSchema.pre(/^findOneAnd/, async function () {
    const answer = await Answer.find({
        question: new mongoose.Types.ObjectId(this._id),
    });

    await Question.findOneAndUpdate(
        { email: this.email },
        {
            answer: answer[0].answer,
        }
    );
});

export default Question;
