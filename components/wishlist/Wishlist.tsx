import { FC, useEffect, useState } from "react";

import { Userlist, Usernav } from "@components/common";
import useWishlist from "@framework/wishlist/use-wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";
import getCustomerId from "@framework/customer/get-customer-id";
import { getCustomerToken } from "@framework/utils";
import { getConfig } from "@framework/api/config";

const Wishlist: FC = () => {
    const getWishlist = useWishlist();
    const [customerId, setCustomerId] = useState<string | null>(null);

    const { data: wishlist } = getWishlist({
        customerId: customerId ?? undefined,
        wishlistToken: getWishlistToken(),
    });

    // TODO Create a context to store the customerId just after he logs in
    // or even better store it in the as a cookie
    useEffect(() => {
        let flag = true;
        async function fetcher(): Promise<void> {
            const config = getConfig();
            try {
                const userId = await getCustomerId({
                    config,
                    customerAccessToken: getCustomerToken(),
                });

                if (flag) setCustomerId(userId);
            } catch (err) {
                console.log(err);
            }
        }

        fetcher();

        return () => {
            flag = false;
        };
    }, []);

    return (
        <Usernav>
            <Userlist variant="wishlist" products={wishlist?.products ?? []} />
        </Usernav>
    );
};

export default Wishlist;
