import { ObjectId } from "mongoose";

export type Checks = "fit" | "durability" | "integrity";

export type IChecks = {
    [id in Checks]?: number;
};

export interface IReview {
    score: number;
    review: string;
    title: string;
    name: string;
    email: string;
    checks?: IChecks;
    product: ObjectId;
}
