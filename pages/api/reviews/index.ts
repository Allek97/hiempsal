// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Review from "server/models/Review";
import { IReview } from "server/types/review";
import { assertIsError, dbConnect } from "server/utils";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    // NOTE: This needs to be writter directely in getStaticProps
    if (method === "GET") {
        const doc = await Review.find({});
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    }

    if (method === "POST") {
        const { body } = req;
        const reviewBody = body as IReview;
        try {
            const doc = await Review.create(reviewBody);

            res.status(201).json({
                status: "success",
                data: {
                    data: doc,
                },
            });
        } catch (err) {
            assertIsError(err);
            return res.status(500).json({
                status: "error",
                message: err.message,
            });
        }
    }
};

export default handler;
