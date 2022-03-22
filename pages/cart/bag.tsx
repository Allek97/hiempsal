import { Cart } from "@components/cart";
import { Layout, Usernav } from "@components/common";

export default function Bag() {
    return (
        <Usernav>
            <Cart />
        </Usernav>
    );
}

Bag.Layout = Layout;
