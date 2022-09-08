import type { NextApiRequest, NextApiResponse } from "next";
import Wishlist from "server/models/Wishlist";
import { IWishlist } from "server/types/wishlist";
import { assertIsError, dbConnect } from "server/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    // NOTE: This needs to be writter directely in getStaticProps if possible
    if (method === "GET") {
        try {
            let query = {};
            if (req.query._id) query = { customerId: req.query._id };
            if (req.query.customerId)
                query = { ...query, customerId: req.query.customerId };

            const doc: IWishlist[] = await Wishlist.find(query);
            return res.status(200).json({
                status: "success",
                data: doc[0],
            });
        } catch (err) {
            assertIsError(err);
            return res.status(400).json({
                status: "error",
                err: err,
            });
        }
    }

    if (method === "POST") {
        const { body } = req;
        const wishListBody = body as IWishlist;

        try {
            const doc = await Wishlist.create(wishListBody);

            return res.status(201).json({
                status: "success",
                data: { wishlist: doc },
            });
        } catch (err) {
            // assertIsError(err);
            return res.status(400).json({
                status: "error",
                err: err,
            });
        }
    }

    if (method === "PATCH") {
        const { body } = req;
        console.log(body, req.query._id);
        const wishListBody = body as Partial<IWishlist> & {
            productId?: string;
        };
        try {
            let doc;
            // Associate customer to a wishlist session object
            if (wishListBody.customerId) {
                doc = await Wishlist.findByIdAndUpdate(req.query._id, {
                    customerId: wishListBody.customerId,
                });
            }
            // Add a product id to the wishlist session
            if (wishListBody.productId) {
                doc = await Wishlist.findByIdAndUpdate(
                    req.query._id,
                    { $addToSet: { products: wishListBody.productId } },
                    { safe: true, upsert: true, new: true }
                );
            }

            if (!doc) throw new Error("No document found with that ID");

            return res.status(200).json({
                status: "success",
                data: { wishlist: doc },
            });
        } catch (err) {
            // assertIsError(err);
            return res.status(400).json({
                status: "error",
                err: err,
            });
        }
    }

    return res.status(400).json({
        status: "Wrong request",
    });
};

export default handler;
