const getProductQuery = `
query product($slug: String!) {
    product(handle: $slug) {
      id
      handle
      title
      vendor
      description
      descriptionHtml
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
        maxVariantPrice {
          amount
          currencyCode
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
      productClothInfo: metafield(namespace: "my_fields", key: "product_cloth_info") {
        value
      }
      productTechInfo: metafield(namespace: "my_fields", key: "product_tech_info") {
        value
      }
    }
  }
  
`;

export default getProductQuery;
