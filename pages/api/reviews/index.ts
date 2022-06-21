// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Review as ReviewType } from "@framework/types/review";
import type { NextApiRequest, NextApiResponse } from "next";
import Review from "server/models/Review";
import { IReview } from "server/types/review";
import { assertIsError, dbConnect } from "server/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    // NOTE: This needs to be writter directely in getStaticProps
    if (method === "GET") {
        let query = {};
        if (req.query.productId) query = { productId: req.query.productId };
        if (req.query.email) query = { ...query, email: req.query.email };

        const doc: ReviewType[] = await Review.find(query);
        return res.status(200).json({
            status: "success",
            data: doc,
        });
    }

    if (method === "POST") {
        const { body } = req;
        const reviewBody = body as IReview;

        try {
            const doc = await Review.create(reviewBody);

            return res.status(201).json({
                status: "success",
                data: { review: doc },
            });
        } catch (err) {
            assertIsError(err);
            return res.status(400).json({
                status: "error",
                err: err,
            });
        }
    }

    res.status(400).json({
        status: "Wrong request",
    });
};

export default handler;
