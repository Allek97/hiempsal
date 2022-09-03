import { orderFragment } from "../common";

const getOrderQuery = `
  query getOrder($orderId: ID!){
    node(id: $orderId) {
      ... on Order {
        ${orderFragment}
      }
    }
  }
`;

export default getOrderQuery;
