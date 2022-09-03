import { Account } from "@components/account/commun";
import { Order } from "@framework/types/order";
import { FC } from "react";

interface Props {
    order: Order;
}

const OrderView: FC<Props> = ({ order }) => {
    return (
        <Account>
            <div>{order.orderName}</div>
        </Account>
    );
};

export default OrderView;
