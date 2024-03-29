const checkoutCustomerDisassociateMutation = ` 
    mutation checkoutCustomerDisassociateV2($checkoutId: ID!) {
        checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
            checkout {
                id
            }
            checkoutUserErrors {
                code
                field
                message
            }
        }
    }
`;

export default checkoutCustomerDisassociateMutation;
