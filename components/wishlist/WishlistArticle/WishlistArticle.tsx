import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCardGiftcard } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";

import {
    AddToCartBtn,
    Root,
    WishlistBonus,
    WishlistImageWrapper,
    WishlistInfo,
    WishlistProduct,
    WishlistRemoveBtn,
} from "./WishlistArticle.styled";

const WishlistArticle: FC = () => {
    return (
        <Root>
            <WishlistProduct>
                <Link href="/" passHref>
                    <div className="flex justify-center items-center w-full bg-accents-1 cursor-pointer">
                        <WishlistImageWrapper>
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
                        </WishlistImageWrapper>
                    </div>
                </Link>

                <WishlistInfo>
                    <div className="flex items-start justify-between">
                        <Link href="/" passHref>
                            <h3>Black radiant classic hoodie for men ...</h3>
                        </Link>

                        <WishlistRemoveBtn
                            onClick={() => alert("Remove Item")}
                            type="button"
                        >
                            <FaHeartBroken />
                        </WishlistRemoveBtn>
                    </div>

                    <span>$300</span>

                    <WishlistBonus>
                        <MdCardGiftcard />
                        <p>Winter Offer</p>
                    </WishlistBonus>

                    <AddToCartBtn>Add to Cart</AddToCartBtn>
                </WishlistInfo>
            </WishlistProduct>
        </Root>
    );
};

export default WishlistArticle;
