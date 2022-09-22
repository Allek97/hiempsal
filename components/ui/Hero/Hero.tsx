import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FunctionalLink } from "@components/utils";

import { AMAZON_S3_DOMAIN } from "@framework/const";

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
    const placeholderImage = "/product-image-placeholder.svg";

    return (
        <Root>
            <HeroContainer>
                <HeroImageWrapper>
                    {variant === "clothing" ? (
                        <Image
                            src={`${AMAZON_S3_DOMAIN}/hero-cloth.jpg`}
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
                            priority
                        />
                    )}
                </HeroImageWrapper>
                <HeroInfo variant={variant}>
                    <h1>
                        {variant === "clothing"
                            ? "The new collection is here"
                            : "Cutting edge fast technology"}
                    </h1>
                    <span>
                        {variant === "clothing"
                            ? "When the sun shines, the new collection emerges. Gear up for the next season with our new products."
                            : "Trusted in the industry. Delivering the best quality devices in the market!"}
                    </span>
                    <div className="flex space-x-10">
                        <Link href="/jacket" passHref>
                            <FunctionalLink>
                                <HeroBtn type="button" aria-label="jacket">
                                    <HiOutlineArrowNarrowRight />
                                    <h1>
                                        {variant === "clothing"
                                            ? "Jackets"
                                            : "Laptops"}
                                    </h1>
                                </HeroBtn>
                            </FunctionalLink>
                        </Link>

                        <Link href="/hoodie" passHref>
                            <FunctionalLink>
                                <HeroBtn type="button" aria-label="hoodie">
                                    <HiOutlineArrowNarrowRight />
                                    <h1>
                                        {variant === "clothing"
                                            ? "Hoodies"
                                            : "Phones"}
                                    </h1>
                                </HeroBtn>
                            </FunctionalLink>
                        </Link>
                        <Link href="/shirt" passHref>
                            <FunctionalLink>
                                {" "}
                                <HeroBtn type="button" aria-label="shirt">
                                    <HiOutlineArrowNarrowRight />
                                    <h1>
                                        {variant === "clothing"
                                            ? "Shirts"
                                            : "Other"}
                                    </h1>
                                </HeroBtn>
                            </FunctionalLink>
                        </Link>
                        <DecorationBottom variant={variant} />
                        <DecorationTop variant={variant} />
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
