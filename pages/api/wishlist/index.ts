import { Product } from "@framework/types/product";
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
            if (req.query._id) query = { _id: req.query._id };
            if (req.query.customerId)
                query = { ...query, customerId: req.query.customerId };

            const doc: IWishlist[] = await Wishlist.find(query);

            return res.status(200).json({
                status: "success",
                data: doc[0] ?? null,
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
        try {
            const doc = await Wishlist.create({});

            return res.status(201).json({
                status: "success",
                data: doc,
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
        const wishListBody = body as Partial<IWishlist> & {
            product?: Product;
        };
        try {
            let doc;
            // Associate customer to a wishlist session object
            if (wishListBody.customerId) {
                doc = await Wishlist.findByIdAndUpdate(req.query._id, {
                    customerId: wishListBody.customerId,
                });
            }
            // Add a product to the wishlist session but all products should be unique
            if (wishListBody.product) {
                doc = await Wishlist.findOneAndUpdate(
                    {
                        _id: req.query._id,
                        "products.id": { $ne: wishListBody.product.id },
                    },
                    { $addToSet: { products: wishListBody.product } },
                    { new: true }
                );
            }

            if (!doc)
                throw new Error(
                    "No document found with that ID or you provided wrong data"
                );

            return res.status(200).json({
                status: "success",
                data: doc,
            });
        } catch (err) {
            // assertIsError(err);
            return res.status(400).json({
                status: "error",
                err: err,
            });
        }
    }

    if (method === "DELETE") {
        const { body } = req;
        const wishListBody = body as Partial<IWishlist> & {
            productId?: string;
        };

        try {
            if (!wishListBody.productId)
                throw new Error("You need to provide the product id");

            const doc = await Wishlist.findByIdAndUpdate(
                req.query._id,
                { $pull: { products: { id: wishListBody.productId } } },
                { safe: true }
            );

            return res.status(200).json({
                status: "success",
                data: doc,
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
