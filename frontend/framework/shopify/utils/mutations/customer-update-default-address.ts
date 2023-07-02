import { addressFragment } from "../common";

const customerUpdateDefaultAddressMutation = `
mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
    customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
      customer {
        id
        defaultAddress {
          ${addressFragment}
        }
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export default customerUpdateDefaultAddressMutation;
