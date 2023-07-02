import { IChecksCloth, IChecksTech } from "server/types/review";

export interface Review {
    _id: string;
    score: number;
    review: string;
    title: string;
    name: string;
    email: string;
    clothChecks?: IChecksCloth;
    techChecks?: IChecksTech;
    productId: string;
    productType: "clothing" | "technology";
    ratingsAverage: number;
}
