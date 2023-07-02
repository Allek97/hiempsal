/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Query as MongooseQuery } from "mongoose";
import { NextApiRequest } from "next";

type QueryObj = NextApiRequest["query"];

class APIFeatures {
    doc: MongooseQuery<any[], any>;
    query: QueryObj;

    constructor(doc: MongooseQuery<any[], any>, query: QueryObj) {
        this.doc = doc;
        this.query = query;
    }

    filter(): this {
        if (this.query.select && typeof this.query.select === "string")
            this.doc = this.doc.select(this.query.select.split(";").join(" "));

        if (this.query.limit && typeof this.query.limit === "string")
            this.doc = this.doc.limit(Number(this.query.limit));

        let queryStr: string = JSON.stringify(this.query);
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|eq|ne)\b/g,
            (match) => `$${match}`
        );

        this.doc = this.doc.find(JSON.parse(queryStr));

        return this;
    }

    sort(): this {
        if (this.query.sort && typeof this.query.sort === "string") {
            const sortBy = this.query.sort.split(";").join(" ");
            this.doc = this.doc.sort(sortBy);
        } else {
            this.doc = this.doc.sort("-createdAt");
        }

        return this;
    }
}

export { APIFeatures };
