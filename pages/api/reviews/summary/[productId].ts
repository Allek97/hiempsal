import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Review from "server/models/Review";
import { assertIsError, dbConnect } from "server/utils";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method } = req;

    await dbConnect();

    if (method === "GET") {
        try {
            const { productId } = req.query;

            const [ratingsAverage, reviewsCount] = await Promise.all([
                Review.calcAverageRatings(productId as string),
                Review.countDocuments({ productId: productId as string }),
            ]);

            return res.status(200).json({
                data: {
                    status: "success",
                    data: {
                        ratingsAverage,
                        reviewsCount,
                    },
                },
            });
        } catch (err) {
            assertIsError(err);
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
