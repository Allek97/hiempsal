import { FC } from "react";
import Image from "next/image";
import Tilt from "react-tilt";

import clothBrands from "@lib/const/sponsors/clothBrands";

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
                        <Tilt className="Tilt cursor-pointer" key={id}>
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
                    </div>
                ))}
            </PartnerList>
        </Root>
    );
};

export default Partner;
