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
