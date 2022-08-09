import mongoose, { Schema } from "mongoose";
import { IChecksCloth, IReview } from "server/types/review";
import validator from "validator";

const checkClothSchema = new Schema<IChecksCloth>({
    fit: { type: String, required: true },
    durability: { type: String, required: true },
    integrity: { type: String, required: true },
});
const checkTechSchema = new Schema<IChecksCloth>({
    fit: { type: String, required: true },
    durability: { type: String, required: true },
    integrity: { type: String, required: true },
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

    clothChecks: {
        type: checkClothSchema,
        required: function () {
            return (this as IReview).productType === "clothing";
        },
    },
    techChecks: {
        type: checkTechSchema,
        required: function () {
            return (this as IReview).productType === "technology";
        },
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
    productId: {
        type: String,
        required: [
            true,
            "You must enter the unique id of the product associated with this review",
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
});

// reviewSchema.statics.calcAverageRatings = async function(tourId) {
//     const stats = await this.aggregate([
//         {
//             $match: { tour: tourId },
//         },
//         {
//             $group: {
//                 _id: "$tour",
//                 nRating: { $sum: 1 },
//                 avgRating: { $avg: "$rating" },
//             },
//         },
//     ]);

//     if (stats.length > 0) {
//         await Tour.findByIdAndUpdate(tourId, {
//             ratingsQuantity: stats[0].nRating,
//             ratingsAverage: stats[0].avgRating,
//         });
//     } else {
//         await Tour.findByIdAndUpdate(tourId, {
//             ratingsQuantity: 0,
//             ratingsAverage: 4.5,
//         });
//     }
// };

const Review =
    mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;
