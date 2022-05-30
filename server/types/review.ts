export type IChecksCloth = {
    fit: string;
    durability: string;
    integrity: string;
};
export type IChecksTech = {
    fit: string;
    durability: string;
    integrity: string;
};

export interface IReview {
    score: number;
    review: string;
    title: string;
    name?: string;
    email: string;
    clothChecks: any;
    techChecks: any;
    productId: string;
    productType: "clothing" | "technology";
}
