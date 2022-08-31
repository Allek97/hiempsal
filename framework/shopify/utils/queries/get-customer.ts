import { checkoutDetailFragment } from "../common";

const getCustomerQuery = `
    query($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
            addresses(first:250) {
                edges {
                    node {
                        id
                    }
                }
            }
            defaultAddress {
                id
            }
            lastIncompleteCheckout {
                ${checkoutDetailFragment}
            }
            tags
            orders(first:250) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    }
`;

export default getCustomerQuery;
