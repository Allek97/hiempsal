import faker from "@faker-js/faker";
import {
    Product,
    ProductOption,
    ProductVariant,
} from "@framework/types/product";
import { colorMap, currencyMap } from "@framework/utils/optionMapping";
import { ProductCartProps } from "../productCart/ProductCart";

const randomColor = faker.random.arrayElement(Object.keys(colorMap));
const randomCurrency = faker.random.arrayElement(Object.keys(currencyMap));

const productOptions: ProductOption[] = [
    {
        id: faker.datatype.uuid(),
        displayName: "color",
        values: [{ label: randomColor }],
    },
    {
        id: faker.datatype.uuid(),
        displayName: "size",
        values: [{ label: faker.commerce.productMaterial() }],
    },
    {
        id: faker.datatype.uuid(),
        displayName: "gender",
        values: [{ label: faker.commerce.productDescription() }],
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
        availableForSale: faker.datatype.boolean(),
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
    availableForSale: faker.datatype.boolean(),
    featureImages: [{ url: faker.image.fashion(), alt: faker.image.fashion() }],
    options: productOptions,
    variants: productVariants,
};
const defaultProps: ProductCartProps = {
    product,
    setSelectedVariant: () => {},
};

export { defaultProps, productOptions, productVariants, product };
