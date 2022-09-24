import styled from "@emotion/styled";
import { ethicalCertifications } from "@lib/const";
import Image from "next/image";
import { placeholderBlurUrl } from "@lib/placeholderBlurUrl";

import { FC } from "react";
import tw from "twin.macro";

export const CertificationBox = styled.div`
    ${tw`flex flex-col mb-1 mt-auto`}

    p {
        ${tw`font-size[10px] color[#676767] pb-1`}
    }

    li {
        ${tw`transition-transform list-none`}

        &:not(:last-of-type) {
            ${tw`mr-1.5`}
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover {
                ${tw`transition-transform`}
                transform : scale(1.1);
            }
        }
    }
`;

const Certification: FC = () => {
    return (
        <CertificationBox>
            <p>Using ethical ressources</p>
            <ul className="flex">
                {ethicalCertifications.map(({ id, link, title, website }) => (
                    <li key={id}>
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={title}
                        >
                            <Image
                                placeholder="blur"
                                blurDataURL={placeholderBlurUrl}
                                src={link}
                                alt={title}
                                layout="fixed"
                                width={30}
                                height={30}
                                priority
                                quality={60}
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </CertificationBox>
    );
};

export default Certification;
