import { getWishlistToken } from "@framework/utils/wishlist-token";
import useWishlist from "@framework/wishlist/use-wishlist";
import { Dispatch, SetStateAction, useEffect } from "react";

type Input = {
    productId: string;
    setIsWishlisted: Dispatch<SetStateAction<boolean>>;
    setWishlistError: Dispatch<SetStateAction<string>>;
};

const useWishlistInitial = ({
    productId,
    setIsWishlisted,
    setWishlistError,
}: Input): void => {
    const getWishlist = useWishlist();
    const { data: wishlist } = getWishlist({
        wishlistToken: getWishlistToken()!,
    });
    useEffect(() => {
        async function fetcher() {
            setWishlistError("");
            try {
                const res = wishlist?.products.some(
                    (product) => product.id === productId
                );

                setIsWishlisted(res ?? false);
            } catch (err) {
                setIsWishlisted(false);
                if (err instanceof Error)
                    setWishlistError(
                        "Server error concerning wishlist status. Please try again"
                    );
            }
        }

        fetcher();
    }, [productId, setIsWishlisted, setWishlistError, wishlist?.products]);
};

export default useWishlistInitial;
