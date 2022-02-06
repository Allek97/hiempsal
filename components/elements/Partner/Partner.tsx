import { FC } from "react";
import Image from "next/image";

import clothBrands from "@lib/const/sponsors/clothBrands";

import { Dot, PartnerList, PartnerSvgWrapper, Root } from "./Partner.styled";

const Partner: FC = () => {
    return (
        <Root>
            <div className="flex flex-col items-center my-16">
                <h1 className="mr-1.5 text-center text-4xl">
                    Collaborating with the finest clothing brands
                </h1>
                <p className="relative text-4xl font-family[Whyte Inktrap] mt-1">
                    in the industry <Dot />
                </p>
            </div>

            <PartnerList>
                {clothBrands.map(({ link, id, title }) => (
                    <PartnerSvgWrapper key={id} name={title}>
                        <Image
                            src={link}
                            alt={title}
                            quality="100"
                            layout="fill"
                            objectFit="contain"
                        />
                    </PartnerSvgWrapper>
                ))}
            </PartnerList>
        </Root>
    );
};

export default Partner;
