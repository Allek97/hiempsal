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
        minVariantPrice {
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
      variantImages: metafield(namespace: "custom", key: "variants_thumbnails") {
        references(first: 10) {
          edges {
            node {
              ... on ProductVariant {
                image {
                  url
                  altText
                }
              }
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
