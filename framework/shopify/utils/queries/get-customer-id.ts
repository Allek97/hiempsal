const getCustomerIdQuery = `
query ($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }  
`;

export default getCustomerIdQuery;
