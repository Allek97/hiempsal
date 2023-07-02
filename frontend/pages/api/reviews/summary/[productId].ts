import { transformToShopifyId } from "@framework/utils/handleShopifyId";
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
            const shopifyProductId = transformToShopifyId(productId as string);
            const [ratingsAverage, reviewsCount] = await Promise.all([
                Review.calcAverageRatings(shopifyProductId),
                Review.countDocuments({ productId: shopifyProductId }),
            ]);

            return res.status(200).json({
                status: "success",
                data: {
                    ratingsAverage,
                    reviewsCount,
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
