import mongoose, { Model, Schema } from "mongoose";
import { IChecksCloth, IChecksTech, IReview } from "server/types/review";
import validator from "validator";

const checkClothSchema = new Schema<IChecksCloth>({
    fit: { type: String, required: true },
    durability: { type: String, required: true },
    integrity: { type: String, required: true },
});
const checkTechSchema = new Schema<IChecksTech>({
    battery: { type: String, required: true },
    design: { type: String, required: true },
    usability: { type: String, required: true },
    performance: { type: String, required: true },
});

interface ReviewStatic extends Model<IReview> {
    calcAverageRatings(productId: string): Promise<number>;
}

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

    clothChecks: {
        type: checkClothSchema,
        required: function () {
            return (this as unknown as IReview).productType === "clothing";
        },
    },
    techChecks: {
        type: checkTechSchema,
        required: function () {
            return (this as unknown as IReview).productType === "technology";
        },
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
    productType: {
        type: String,
        enum: ["clothing", "technology"],
        required: [
            true,
            "You need to provide the type of the product, it's either clothing or technology",
        ],
    },
    ratingsAverage: {
        type: Number,
        default: 0,
        set: (val: number) => Math.round(val * 10) / 10,
    },
});

reviewSchema.index({ email: 1, productId: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (
    productId: string
): Promise<number> {
    const stats = await this.aggregate([
        {
            $match: { productId: productId },
        },
        {
            $group: {
                _id: "$product",
                avgRating: { $avg: "$score" },
            },
        },
    ]);

    return stats.length > 0 ? stats[0].avgRating : 0;
};

const Review =
    mongoose.models.Review ||
    mongoose.model<IReview, ReviewStatic>("Review", reviewSchema);

export default Review as ReviewStatic;
