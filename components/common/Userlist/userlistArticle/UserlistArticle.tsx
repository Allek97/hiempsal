import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdCardGiftcard } from "react-icons/md";
import { FaHeartBroken } from "react-icons/fa";

import {
    AddToCartBtn,
    Root,
    UserlistBonus,
    UserlistImageWrapper,
    UserlistInfo,
    UserlistProduct,
    UserlistRemoveBtn,
} from "./UserlistArticle.styled";

const UserlistArticle: FC = () => {
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

                        <UserlistRemoveBtn
                            onClick={() => alert("Remove Item")}
                            type="button"
                        >
                            <FaHeartBroken />
                        </UserlistRemoveBtn>
                    </div>

                    <span>$300</span>

                    <UserlistBonus>
                        <MdCardGiftcard />
                        <p>Winter Offer</p>
                    </UserlistBonus>

                    <AddToCartBtn>Add to Cart</AddToCartBtn>
                </UserlistInfo>
            </UserlistProduct>
        </Root>
    );
};

export default UserlistArticle;
