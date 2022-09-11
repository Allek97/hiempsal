import { FC } from "react";

import { Userlist, Usernav } from "@components/common";
import useWishlist from "@framework/wishlist/use-wishlist";
import { getCustomerToken } from "@framework/utils";
import { getWishlistToken } from "@framework/utils/wishlist-token";

const Wishlist: FC = () => {
    const getWishlist = useWishlist();
    const { data } = getWishlist({
        customerId: getCustomerToken(),
        wishlistToken: getWishlistToken(),
    });

    console.log(data);
    return (
        <Usernav>
            <Userlist variant="wishlist" products={data?.products ?? []} />
        </Usernav>
    );
};

export default Wishlist;
