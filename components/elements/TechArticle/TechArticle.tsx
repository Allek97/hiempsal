import { FC } from "react";
import Image from "next/image";
import { ImageWrapper, Root } from "./TechArticle.styled";

const TechArticle: FC = () => {
    return (
        <Root>
            <ImageWrapper>
                <Image
                    src="/images/macbook-pro.png"
                    alt="mcbook"
                    layout="fill"
                    objectFit="contain"
                />
            </ImageWrapper>
            <h1>iPad Pro 12.9 Case (5th Gen) 2021</h1>
            <h2>$69.99</h2>
        </Root>
    );
};

export default TechArticle;
