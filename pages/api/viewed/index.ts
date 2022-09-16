import { Product } from "@framework/types/product";
import type { NextApiRequest, NextApiResponse } from "next";
import Viewed from "server/models/Viewed";
import { IViewed } from "server/types/viewed";
import { assertIsError, dbConnect } from "server/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    // NOTE: This needs to be writter directely in getStaticProps if possible
    if (method === "GET") {
        try {
            let doc;

            if (req.query.productId) {
                doc = await Viewed.find(
                    { _id: req.query._id },
                    {
                        products: { $elemMatch: { id: req.query.productId } },
                    }
                );
            } else {
                let query = {};
                if (req.query._id) query = { _id: req.query._id };
                if (req.query.customerId)
                    query = { ...query, customerId: req.query.customerId };

                doc = await Viewed.find(query);
            }

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
            const doc = await Viewed.create({});

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
        const viewedBody = body as Partial<IViewed> & {
            product?: Product;
        };
        try {
            let doc;

            if (viewedBody.customerId) {
                doc = await Viewed.findByIdAndUpdate(req.query._id, {
                    customerId: viewedBody.customerId,
                });
            }

            if (viewedBody.product) {
                doc = await Viewed.findOneAndUpdate(
                    {
                        _id: req.query._id,
                        "products.id": { $ne: viewedBody.product.id },
                    },
                    { $addToSet: { products: viewedBody.product } },
                    { new: true }
                );
            }

            // if (!doc)
            //     throw new Error(
            //         "No document found with that ID or you provided wrong data"
            //     );

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
        const viewedBody = body as Partial<IViewed> & {
            productId?: string;
        };

        try {
            if (!viewedBody.productId)
                throw new Error("You need to provide the product id");

            const doc = await Viewed.findByIdAndUpdate(
                req.query._id,
                { $pull: { products: { id: viewedBody.productId } } },
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
