const getCustomerQuery = `
    query($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            id
            firstName
            lastName
            acceptsMarketing
            email
            phone
        }
    }
`;

export default getCustomerQuery;
