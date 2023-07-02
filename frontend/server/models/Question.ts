import mongoose, { Schema } from "mongoose";

import { IQuestion } from "server/types/question";
import validator from "validator";

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
        lowercase: true,
        validate: [validator.isEmail, "You need to provide a valid email"],
    },
    productId: {
        type: String,
        required: [
            true,
            "You must enter the id of the product associated with this review",
        ],
    },
    answer: {
        type: String,
        default: "",
    },
});

questionSchema.index({ email: 1, productId: 1 }, { unique: true });

const Question =
    mongoose.models.Question ||
    mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
