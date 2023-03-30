const productConnection = `
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
                minVariantPrice{
                  amount
                  currencyCode
                }
              }
            images(first: 20) { 
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                        url
                        altText
                 
                    }
                }
            }
            variants(first: 250) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    requiresShipping
                    selectedOptions {
                        name
                        value
                      }
                      priceV2 {
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
              featureName: metafield(namespace: "my_fields", key: "feature_name") {
                value
              }
              features: metafield(namespace: "my_fields", key: "features") {
                value
              }
              type: metafield(namespace: "my_fields", key: "type") {
                value
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
