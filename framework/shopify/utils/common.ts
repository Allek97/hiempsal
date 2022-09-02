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
