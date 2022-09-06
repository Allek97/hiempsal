const customerUpdateAddressMutation = `
mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
    customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
      customerAddress {
        address1
        address2
        city
        name
        company
        country
        countryCodeV2
        id
        latitude
        longitude
        province
        provinceCode
        zip
        formattedArea
        formatted
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default customerUpdateAddressMutation;
