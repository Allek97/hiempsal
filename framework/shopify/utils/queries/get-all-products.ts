const productConnection = `
    pageInfo {
        hasNextPage
        hasPreviousPage
        }
        edges {
            node {
            id
            title
            vendor
            handle
            description
            availableForSale
            options {
                id
                name
                values
              }
            priceRange {
                minVariantPrice {
                amount
                currencyCode
                }
            }
            images(first: 1) { 
                pageInfo {
                hasNextPage
                hasPreviousPage
                }
                edges {
                node {
                    url
                    altText
                    width
                    height
                }
                }
            }
            variants(first: 250) {
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
                edges {
                  node {
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
    }
`;

const getAllProductsQuery = `
    query getAllProducts($first: Int = 50) {
            products(first: $first) {
                ${productConnection}
            }
        
    }
`;

export default getAllProductsQuery;
