// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Review from "server/models/Review";
import { dbConnect } from "server/utils";

dbConnect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        const doc = await Review.find({});
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    }
};

export default handler;
