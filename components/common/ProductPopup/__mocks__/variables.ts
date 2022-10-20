import faker from "@faker-js/faker";
import {
    Product,
    ProductOption,
    ProductVariant,
} from "@framework/types/product";
import { currencyMap } from "@framework/utils/optionMapping";
import { ProductCartProps } from "../productCart/ProductCart";

const randomCurrency = faker.helpers.arrayElement(Object.keys(currencyMap));

const productOptions: ProductOption[] = [
    {
        id: faker.datatype.uuid(),
        displayName: faker.helpers.arrayElement(["color", "watch band"]),
        values: [{ label: faker.commerce.color() }],
    },
    {
        id: faker.datatype.uuid(),
        displayName: faker.helpers.arrayElement([
            "size",
            faker.commerce.productAdjective(),
        ]),
        values: [{ label: faker.commerce.productMaterial() }],
    },
    {
        id: faker.datatype.uuid(),
        displayName: faker.helpers.arrayElement([
            "gender",
            faker.commerce.productAdjective(),
        ]),
        values: [{ label: faker.commerce.product() }],
    },
];
const productVariants: ProductVariant[] = [
    {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        sku: faker.datatype.uuid(),
        image: { url: faker.image.fashion(), alt: faker.image.fashion() },
        price: faker.datatype.number(),
        listPrice: faker.datatype.number(),
        requiresShipping: faker.datatype.boolean(),
        availableForSale: true,
        options: productOptions,
    },
];

const product: Product = {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    vendor: faker.company.companyName(),
    description: faker.commerce.productDescription(),
    path: faker.datatype.string(),
    slug: faker.datatype.string(),
    images: [{ url: faker.image.fashion(), alt: faker.image.fashion() }],
    price: {
        currencyCode: randomCurrency,
        value: faker.datatype.number(),
    },
    availableForSale: true,
    featureImages: [{ url: faker.image.fashion(), alt: faker.image.fashion() }],
    options: productOptions,
    variants: productVariants,
    dimensions: {},
    featureName: "",
    features: {
        features: {},
    },
    materials: {},
    shipping: {
        shipping: {
            content: "",
            description: "",
        },
        shippingCost: {
            description: "",
            content: "",
        },
    },
    sustainability: {
        features: {},
    },
    type: "clothing",
};
const defaultProps: ProductCartProps = {
    product,
    setSelectedVariant: () => {},
};

export { defaultProps, productOptions, productVariants, product };
