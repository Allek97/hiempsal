/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose, { ConnectOptions } from "mongoose";

async function dbConnect() {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const DB = process.env.DATABASE!.replace(
        "<PASSWORD>",
        process.env.DATABASE_PASSWORD!
    );

    return mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => {
            // eslint-disable-next-line no-console
            console.log("DB Connection Successful");
        });
}

export default dbConnect;
