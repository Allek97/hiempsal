import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMediaQueryNext } from "lib/customHooks";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import {
    Root,
    HeroImageWrapper,
    HeroInfo,
    HeroBtn,
    DecorationTop,
    DecorationBottom,
    HeroContainer,
    HeroMessage,
} from "./HeroCloth.styled";

const HeroCloth: FC = () => {
    const isScreenLarge = useMediaQueryNext("lg");

    const placeholderImage = "/product-image-placeholder.svg";

    return (
        <Root>
            <HeroContainer>
                <HeroImageWrapper>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_AMAZON_S3_DOMAIN}/hero-cloth.jpg`}
                        alt="Model"
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={placeholderImage}
                        objectPosition="28.3% 33.1%"
                        priority
                    />
                </HeroImageWrapper>
                <HeroInfo>
                    <h1>Powerful Clothes</h1>
                    <span>
                        Our clothing collection. Challenge the impossible.
                    </span>
                    <div className="flex space-x-10">
                        <Link href="/jacket" passHref>
                            <HeroBtn
                                isSelected={!isScreenLarge}
                                type="button"
                                aria-label="Cart"
                            >
                                <HiOutlineArrowNarrowRight />
                                <h1>Jacket</h1>
                            </HeroBtn>
                        </Link>

                        <Link href="/hoodie" passHref>
                            <HeroBtn isSelected={!isScreenLarge} type="button">
                                <HiOutlineArrowNarrowRight />
                                <h1>Hoodie</h1>
                            </HeroBtn>
                        </Link>
                        <Link href="/shirt" passHref>
                            <HeroBtn
                                isSelected={!isScreenLarge}
                                aria-label="Cart"
                            >
                                <HiOutlineArrowNarrowRight />
                                <h1>Shirt</h1>
                            </HeroBtn>
                        </Link>
                        <DecorationTop />
                        <DecorationBottom />
                    </div>
                </HeroInfo>
            </HeroContainer>
            <HeroMessage>
                <span>Loved by our</span>
                <h1>Community</h1>
            </HeroMessage>
        </Root>
    );
};

export default HeroCloth;
