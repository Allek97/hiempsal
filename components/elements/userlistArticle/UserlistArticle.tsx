import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCardGiftcard } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";

import { ProductPopup } from "@components/common/ProductPopup/productPopup";

import { useUI } from "@components/ui/context";

import {
    AddToCartBtn,
    Root,
    UserlistBonus,
    UserlistImageWrapper,
    UserlistInfo,
    UserlistProduct,
    UserlistBtn,
} from "../../common/ProductArticle/ProductArticle.styled";

interface Props {
    variant: "wishlist" | "products";
}

const UserlistArticle: FC<Props> = ({ variant }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);

    const { isProductPopupOpen, openProductPopup } = useUI();

    function viewedProductAction() {
        if (isAddedToWishlist) {
            setIsAddedToWishlist(false);
            // console.log("Remove item from wish list");
        } else {
            setIsAddedToWishlist(true);
            // console.log("Add item to wish list");
        }
    }

    const manageProductAction = (): void => {
        switch (variant) {
            case "wishlist":
                alert("Remove Item");
                break;
            case "products":
                viewedProductAction();
                break;

            default:
                break;
        }
    };

    return (
        <Root>
            {isProductPopupOpen && <ProductPopup />}
            <UserlistProduct>
                <Link href="/" passHref>
                    <div className="flex justify-center items-center w-full bg-accents-1 cursor-pointer">
                        <UserlistImageWrapper>
                            <div>
                                <Image
                                    src="/images/mcbook.png"
                                    alt="Black hoodie"
                                    width={2}
                                    height={3}
                                    quality="50"
                                    layout="responsive"
                                    objectFit="contain"
                                    priority
                                />
                            </div>
                        </UserlistImageWrapper>
                    </div>
                </Link>

                <UserlistInfo>
                    <div className="flex items-start justify-between">
                        <Link href="/" passHref>
                            <h3>Black radiant classic hoodie for men ...</h3>
                        </Link>

                        <UserlistBtn
                            onClick={manageProductAction}
                            type="button"
                            isWishlist={variant === "wishlist"}
                            isAddedToWishlist={isAddedToWishlist}
                        >
                            {variant === "wishlist" ? (
                                <FaHeartBroken />
                            ) : (
                                <RiHeartAddLine />
                            )}
                        </UserlistBtn>
                    </div>

                    <span>$300</span>

                    <UserlistBonus>
                        <MdCardGiftcard />
                        <p>Winter Offer</p>
                    </UserlistBonus>

                    {variant === "wishlist" && (
                        <AddToCartBtn onClick={openProductPopup}>
                            Add to Cart
                        </AddToCartBtn>
                    )}
                </UserlistInfo>
            </UserlistProduct>
        </Root>
    );
};

export default UserlistArticle;
