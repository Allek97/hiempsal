import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { DeviceInfo, ImageWrapper, Root } from "./TechArticle.styled";

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
            <DeviceInfo>
                <Link href="/" passHref>
                    <h3>iPad Pro 12.9 2021</h3>
                </Link>

                <p>CAD $69.99</p>
                <span className="w-max mb-5 text-sm border-b border-accents-7 border-dashed cursor-default">
                    Free Shipping
                </span>
            </DeviceInfo>
        </Root>
    );
};

export default TechArticle;
