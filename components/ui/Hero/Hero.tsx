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
} from "./Hero.styled";

interface Props {
    variant: "clothing" | "technology";
}

const Hero: FC<Props> = ({ variant }) => {
    const isScreenLarge = useMediaQueryNext("lg");

    const placeholderImage = "/product-image-placeholder.svg";

    return (
        <Root>
            <HeroContainer>
                <HeroImageWrapper>
                    {variant === "clothing" ? (
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
                    ) : (
                        <Image
                            src="/images/hero-tech-2.jpg"
                            alt="Model"
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={placeholderImage}
                            objectPosition="28.3% 33.1%"
                            quality="100"
                            priority
                        />
                    )}
                </HeroImageWrapper>
                <HeroInfo>
                    <h1>
                        {variant === "clothing"
                            ? "Powerful Clothes"
                            : "Latest Technologies"}
                    </h1>
                    <span>
                        {variant === "clothing"
                            ? "Our clothing collection. Challenge the impossible."
                            : "Trusted in the industry. Delivering the best quality devices in the market !"}
                    </span>
                    <div className="flex space-x-10">
                        <Link href="/jacket" passHref>
                            <HeroBtn type="button" aria-label="Cart">
                                <HiOutlineArrowNarrowRight />
                                <h1>
                                    {variant === "clothing"
                                        ? "Jackets"
                                        : "Laptops"}
                                </h1>
                            </HeroBtn>
                        </Link>

                        <Link href="/hoodie" passHref>
                            <HeroBtn type="button">
                                <HiOutlineArrowNarrowRight />
                                <h1>
                                    {variant === "clothing"
                                        ? "Hoodies"
                                        : "Phones"}
                                </h1>
                            </HeroBtn>
                        </Link>
                        <Link href="/shirt" passHref>
                            <HeroBtn aria-label="Cart">
                                <HiOutlineArrowNarrowRight />
                                <h1>
                                    {variant === "clothing"
                                        ? "Shirts"
                                        : "Other"}
                                </h1>
                            </HeroBtn>
                        </Link>
                        <DecorationTop />
                        <DecorationBottom />
                    </div>
                </HeroInfo>
            </HeroContainer>
            <HeroMessage>
                <span>
                    {variant === "clothing" ? "Loved by our" : "Trusted by our"}
                </span>
                <h1>{variant === "clothing" ? "Community" : "Customers"}</h1>
            </HeroMessage>
        </Root>
    );
};

export default Hero;
