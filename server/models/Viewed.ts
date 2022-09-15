import mongoose, { Schema } from "mongoose";
import { IViewed } from "server/types/viewed";

const viewedSchema = new Schema<IViewed>({
    products: [Schema.Types.Mixed],
    customerId: {
        type: String,
        required: false,
    },
});

viewedSchema.index({ customerId: 1 }, { unique: true, sparse: true });

const Viewed =
    mongoose.models.Viewed || mongoose.model<IViewed>("Viewed", viewedSchema);

export default Viewed;
