import mongoose, { Schema } from "mongoose";
import { IWishlist } from "server/types/wishlist";

const wishlistSchema = new Schema<IWishlist>({
    products: [Schema.Types.Mixed],
    customerId: {
        type: String,
        required: false,
    },
});

wishlistSchema.index({ customerId: 1 }, { unique: true, sparse: true });

const Wishlist =
    mongoose.models.Wishlist ||
    mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;
