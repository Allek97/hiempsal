import {
    addressFragment,
    checkoutDetailFragment,
    orderFragment,
} from "../common";

const getCustomerQuery = `
query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      displayName
      email
      phone
      acceptsMarketing
      updatedAt
      createdAt
      tags
      addresses(first: 250) {
        edges {
          node {
            ${addressFragment}
          }
        }
      }
      defaultAddress {
        ${addressFragment}
      }
      lastIncompleteCheckout {
        ${checkoutDetailFragment}
      }
      orders(first: 250) {
        edges {
          node {
            ${orderFragment}
          }
        }
      }
    }
  }  
`;

export default getCustomerQuery;
