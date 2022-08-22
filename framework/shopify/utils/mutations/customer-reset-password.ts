const customerResetPasswordMutation = ` 
    mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
            customerUserErrors {
                code
                field
                message
            }
            customer {
                id
            }
        }
  }
`;

export default customerResetPasswordMutation;
