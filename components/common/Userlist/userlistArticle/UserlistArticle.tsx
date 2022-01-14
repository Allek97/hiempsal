import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCardGiftcard } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { RiHeartAddLine } from "react-icons/ri";

import {
    AddToCartBtn,
    Root,
    UserlistBonus,
    UserlistImageWrapper,
    UserlistInfo,
    UserlistProduct,
    UserlistBtn,
} from "./UserlistArticle.styled";

interface Props {
    variant: "wishlist" | "viewed-products";
}

const UserlistArticle: FC<Props> = ({ variant }) => {
    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);

    function viewedProductAction() {
        if (isAddedToWishlist) {
            setIsAddedToWishlist(false);
            console.log("Remove item from wish list");
        } else {
            setIsAddedToWishlist(true);
            console.log("Add item to wish list");
        }
    }

    const manageProductAction = (): void => {
        switch (variant) {
            case "wishlist":
                alert("Remove Item");
                break;
            case "viewed-products":
                viewedProductAction();
                break;

            default:
                break;
        }
    };

    return (
        <Root>
            <UserlistProduct>
                <Link href="/" passHref>
                    <div className="flex justify-center items-center w-full bg-accents-1 cursor-pointer">
                        <UserlistImageWrapper>
                            <div>
                                <Image
                                    src="/images/Men-Hoodie-White-Front.png"
                                    alt="Black hoodie"
                                    width={2}
                                    height={3}
                                    quality="80"
                                    layout="responsive"
                                    objectFit="contain"
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
                        <AddToCartBtn>Add to Cart</AddToCartBtn>
                    )}
                </UserlistInfo>
            </UserlistProduct>
        </Root>
    );
};

export default UserlistArticle;
