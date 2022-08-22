const customerCreateMutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
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

export default customerCreateMutation;
