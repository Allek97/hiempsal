import { NextApiRequest, NextApiResponse } from "next";
import Answer from "server/models/Answer";
import { IAnswer } from "server/types/answer";

import { assertIsError, dbConnect } from "server/utils";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await dbConnect();

    if (method === "GET") {
        try {
            let query = {};
            if (req.query.question) query = { question: req.query.question };

            const doc: IAnswer[] = await Answer.find(query);

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
        const answerBody = body as IAnswer;

        try {
            const doc = await Answer.create(answerBody);

            return res.status(201).json({
                status: "success",
                data: { asnwer: doc },
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
