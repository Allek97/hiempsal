import { FC } from "react";
import Image from "next/image";
// FIX: Find another library
import Tilt from "react-parallax-tilt";

import { Media } from "@lib/media";
import clothBrands from "@lib/const/clothBrands";

import { Dot, PartnerList, PartnerSvgWrapper, Root } from "./Partner.styled";

const Partner: FC = () => {
    return (
        <Root>
            <h1>
                Collaborating with the finest clothing brands in the industry.
                <Dot />
            </h1>

            <PartnerList>
                {clothBrands.map(({ link, id, title }) => (
                    <div key={id}>
                        <Media greaterThanOrEqual="lg">
                            <Tilt className="cursor-pointer" key={id}>
                                <PartnerSvgWrapper key={id} name={title}>
                                    <Image
                                        src={link}
                                        alt={title}
                                        quality="100"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </PartnerSvgWrapper>
                            </Tilt>
                        </Media>
                        <Media lessThan="lg">
                            <PartnerSvgWrapper key={id} name={title}>
                                <Image
                                    src={link}
                                    alt={title}
                                    quality="100"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </PartnerSvgWrapper>
                        </Media>
                    </div>
                ))}
            </PartnerList>
        </Root>
    );
};

export default Partner;
