import { NextApiRequest, NextApiResponse } from "next";

import Question from "server/models/Question";
import { IQuestion } from "server/types/question";
import { assertIsError, dbConnect } from "server/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    if (method === "GET") {
        try {
            let query = {};
            if (req.query.productId) query = { productId: req.query.productId };
            if (req.query.email) query = { ...query, email: req.query.email };

            const doc: IQuestion[] = await Question.find(query);

            return res.status(200).json({
                status: "success",
                data: doc,
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
        const questionBody = body as IQuestion;

        try {
            const doc = await Question.create(questionBody);

            return res.status(201).json({
                status: "success",
                data: { question: doc },
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
