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
            images(first: 250) { 
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
              category: metafield(namespace: "my_fields", key: "product_category") {
                value
                type
              }
              additionalImage1: metafield(namespace: "my_fields", key: "additional_image_1") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              additionalImage2: metafield(namespace: "my_fields", key: "additional_image_2") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              featureImage1: metafield(namespace: "my_fields", key: "feature_image_1") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
              featureImage2: metafield(namespace: "my_fields", key: "feature_image_2") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText 
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
              materials: metafield(namespace: "my_fields", key: "materials") {
                value
              }
              sustainability: metafield(namespace: "my_fields", key: "sustainability") {
                value
              }
              dimensions: metafield(namespace: "my_fields", key: "dimensions") {
                value
              }
              shipping: metafield(namespace: "my_fields", key: "shipping") {
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
