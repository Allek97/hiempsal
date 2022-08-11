export type ChecksCloth = {
    fit: string;
    durability: string;
    integrity: string;
};
export type ChecksTech = {
    fit: string;
    durability: string;
    integrity: string;
};

export interface Review {
    score: number;
    review: string;
    title: string;
    name: string;
    email: string;
    clothChecks?: ChecksCloth;
    techChecks?: ChecksTech;
    productId: string;
    productType: "clothing" | "technology";
    ratingsAverage: number;
}
