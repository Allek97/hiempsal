const checkoutCustomerAssociateMutation = ` 
    mutation checkoutCustomerAssociateV2($checkoutId: , $customerAccessToken: ) {
        checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
            checkout {
                # Checkout fields
            }
            checkoutUserErrors {
                # CheckoutUserError fields
            }
            customer {
                # Customer fields
            }
        }
    }
`;

export default checkoutCustomerAssociateMutation;
