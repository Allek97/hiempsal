const getCustomerIdQuery = `
query getCustomerId($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }  
`;

export default getCustomerIdQuery;
