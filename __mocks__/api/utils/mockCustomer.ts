import faker from "@faker-js/faker";
import { Customer as ShopifyCustomer } from "@framework/schema";

const emptyShopifyConnection = {
    edges: [],
    pageInfo: { hasNextPage: false, hasPreviousPage: false },
};

const shopifyCustomerMock: ShopifyCustomer = {
    acceptsMarketing: false,
    addresses: emptyShopifyConnection,
    createdAt: "",
    defaultAddress: null,
    displayName: faker.name.firstName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    id: faker.datatype.uuid(),
    lastIncompleteCheckout: null,
    lastName: faker.name.lastName(),
    orders: emptyShopifyConnection,
    phone: faker.phone.phoneNumber("+1 438-5##-####"),
    updatedAt: null,
    tags: [],
};

export { shopifyCustomerMock };
