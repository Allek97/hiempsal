import { FC } from "react";
import Image from "next/image";
import Tilt from "react-tilt";
import { useMediaQueryNext } from "@lib/customHooks";

import clothBrands from "@lib/const/sponsors/clothBrands";

import { Dot, PartnerList, PartnerSvgWrapper, Root } from "./Partner.styled";

const Partner: FC = () => {
    const isScreenLarge = useMediaQueryNext("lg");

    return (
        <Root>
            <h1>
                Collaborating with the finest clothing brands in the industry.
                <Dot />
            </h1>

            <PartnerList>
                {clothBrands.map(({ link, id, title }) => (
                    <div key={id}>
                        {isScreenLarge ? (
                            <Tilt className="Tilt cursor-pointer" key={id}>
                                <PartnerSvgWrapper
                                    isScreenLarge={isScreenLarge}
                                    key={id}
                                    name={title}
                                >
                                    <Image
                                        src={link}
                                        alt={title}
                                        quality="100"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </PartnerSvgWrapper>
                            </Tilt>
                        ) : (
                            <PartnerSvgWrapper
                                isScreenLarge={isScreenLarge}
                                key={id}
                                name={title}
                            >
                                <Image
                                    src={link}
                                    alt={title}
                                    quality="100"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </PartnerSvgWrapper>
                        )}
                    </div>
                ))}
            </PartnerList>
        </Root>
    );
};

export default Partner;
