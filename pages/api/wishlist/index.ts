import { getConfig } from "@framework/api/config";
import getProduct from "@framework/product/get-product";
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

            const products: Array<Product | null> = [];
            if (doc[0]?.products?.length) {
                await Promise.all(
                    doc[0]?.products?.map(async (slug) => {
                        try {
                            const { product } = await getProduct({
                                config: getConfig(),
                                variables: {
                                    slug,
                                },
                            });
                            products.push(product);
                        } catch (err) {
                            if (
                                err instanceof Error &&
                                err.message.includes("slug")
                            ) {
                                await Wishlist.findByIdAndUpdate(
                                    req.query._id,
                                    { $pull: { products: slug } },
                                    { safe: true }
                                );
                            }
                        }
                    })
                );
            }

            return res.status(200).json({
                status: "success",
                data: doc[0]
                    ? {
                          products: products,
                          _id: doc[0]._id,
                          ...(doc[0].customerId && {
                              customerId: doc[0].customerId,
                          }),
                      }
                    : null,
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
            slug?: string;
        };
        try {
            let doc;
            // Associate customer to a wishlist session object
            if (wishListBody.customerId) {
                doc = await Wishlist.findByIdAndUpdate(wishListBody._id, {
                    customerId: wishListBody.customerId,
                });
            }
            // Add a product id to the wishlist session
            if (wishListBody.slug) {
                doc = await Wishlist.findByIdAndUpdate(
                    wishListBody._id,
                    { $addToSet: { products: wishListBody.slug } },
                    { safe: true, upsert: true, new: true }
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
            slug?: string;
        };

        try {
            if (!wishListBody.slug)
                throw new Error("You need to provide the product slug");

            const doc = await Wishlist.findByIdAndUpdate(
                wishListBody._id,
                { $pull: { products: wishListBody.slug } },
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
