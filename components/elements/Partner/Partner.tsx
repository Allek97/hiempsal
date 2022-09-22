import { FC } from "react";
import { BlurImage } from "@components/common";
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
                                    <BlurImage
                                        src={link}
                                        alt={title}
                                        layout="fill"
                                        objectFit="contain"
                                        priority
                                    />
                                </PartnerSvgWrapper>
                            </Tilt>
                        </Media>
                        <Media lessThan="lg">
                            <PartnerSvgWrapper key={id} name={title}>
                                <BlurImage
                                    src={link}
                                    alt={title}
                                    layout="fill"
                                    objectFit="contain"
                                    priority
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
