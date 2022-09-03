export const checkoutDetailFragment = `
  id
  webUrl
  subtotalPriceV2{
    amount
    currencyCode
  }
  totalTaxV2 {
    amount
    currencyCode
  }
  totalPriceV2 {
    amount
    currencyCode
  }
  completedAt
  createdAt
  taxesIncluded
  lineItems(first: 250) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        variant {
          id
          sku
          title
          selectedOptions {
              name
              value
          }
          image {
            url
            altText
            width
            height
          }
          priceV2{
            amount
            currencyCode
          }
          compareAtPriceV2{
            amount
            currencyCode
          }
          product { 
            handle
          }
        }
        quantity
      }
    }
  }
`;

export const addressFragment = `
    address1
    address2
    city
    name
    company
    country
    countryCodeV2
    firstName
    lastName
    id
    latitude
    longitude
    phone
    province
    provinceCode
    zip
    formattedArea
    formatted
`;

export const orderFragment = `
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
        sku
        requiresShipping
        availableForSale
        selectedOptions {
          name
          value
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        image {
          url
          altText
          width
          height
        }
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
`;
