import mongoose, { Schema, ObjectId } from "mongoose";
import validator from "validator";

type Checks = "fit" | "durability" | "integrity";

type IChecks = {
    [id in Checks]?: number;
};

interface IReview {
    score: number;
    review: string;
    title: string;
    name: string;
    email: string;
    checks?: IChecks;
    product: ObjectId;
}

const checkSchema = new Schema<IChecks>({
    fit: { String, required: false },
    durability: { String, required: false },
    integrity: { String, required: false },
});

const reviewSchema = new Schema<IReview>({
    score: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must have a score"],
    },
    review: {
        type: String,
        required: [true, "Review body cannot be empty"],
    },
    title: {
        type: String,
        required: [true, "Review title cannot be empty"],
    },
    checks: {
        type: [checkSchema],
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
    product: {
        type: mongoose.Types.ObjectId,
        required: [
            true,
            "You must enter the unique id of the product associated with this review",
        ],
    },
});

const Review =
    mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
