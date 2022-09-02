import { addressFragment, checkoutDetailFragment } from "../common";

const getCustomerQuery = `
query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      acceptsMarketing
      email
      phone
      updatedAt
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
            id
            cancelReason
            canceledAt
            currencyCode
            fulfillmentStatus
            currentSubtotalPrice {
              amount
              currencyCode
            }
            currentTotalDuties {
              amount
              currencyCode
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            currentTotalTax {
              amount
              currencyCode
            }
            customerLocale
            customerUrl
            edited
            email
            financialStatus
            financialStatus
            id
            lineItems(first: 250) {
              edges {
                node {
                  currentQuantity
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  quantity
                  title
                  variant {
                    id
                    title
                    image {
                      id
                      url
                      altText
                    }
                    selectedOptions {
                      name
                      value
                    }
                    barcode
                    priceV2 {
                      amount
                      currencyCode
                    }
                    currentlyNotInStock
                    weight
                  }
                }
              }
            }
            name
            orderNumber
            originalTotalDuties {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            phone
            processedAt
            shippingAddress {
                ${addressFragment}
            }
            statusUrl
            subtotalPriceV2 {
              amount
              currencyCode
            }
            successfulFulfillments(first: 250) {
              trackingCompany
              trackingInfo {
                number
                url
              }
            }
            totalPriceV2 {
              amount
              currencyCode
            }
            totalRefundedV2 {
              amount
              currencyCode
            }
            totalShippingPriceV2 {
              amount
              currencyCode
            }
            totalTaxV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }  
`;

export default getCustomerQuery;
