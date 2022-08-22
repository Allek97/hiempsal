const customerRecoverPasswordMutation = ` 
    mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;

export default customerRecoverPasswordMutation;
