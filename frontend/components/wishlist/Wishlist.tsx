import { FC } from "react";
import { Userlist, Usernav } from "@components/common";
import useWishlist from "@framework/wishlist/use-wishlist";
import { getWishlistToken } from "@framework/utils/wishlist-token";

interface Props {
    customerId: string | null;
}

const Wishlist: FC<Props> = ({ customerId }) => {
    const getWishlist = useWishlist();

    const { data: wishlist } = getWishlist({
        customerId: customerId ?? undefined,
        wishlistToken: getWishlistToken(),
    });

    return (
        <Usernav>
            <Userlist variant="wishlist" products={wishlist?.products ?? []} />
        </Usernav>
    );
};

export default Wishlist;
