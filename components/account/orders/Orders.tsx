import { getConfig } from "@framework/api/config";
import { getAllProducts } from "@framework/product";
import { Product } from "@framework/types/product";
import { FC, useEffect, useState } from "react";
import { Userlist } from "@components/common";
import { Account } from "../commun";

const Orders: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        let flag = true;

        async function fetcher() {
            const config = getConfig();
            const data: Product[] = await getAllProducts(config);

            if (flag) setProducts(data);
        }

        fetcher();

        return () => {
            flag = false;
        };
    }, []);
    return (
        <Account>
            <Userlist products={products} variant="order" />
        </Account>
    );
};

export default Orders;
