const customerDeleteAccessTokenMutation = `
    mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
            deletedAccessToken
            deletedCustomerAccessTokenId
            userErrors {
                field
                message
            }
        }
    }
`;

export default customerDeleteAccessTokenMutation;
