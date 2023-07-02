const customerUpdateAddressMutation = `
mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
    customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
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
