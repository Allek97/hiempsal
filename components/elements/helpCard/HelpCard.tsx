import Image from "next/image";
import { FC } from "react";
import { HelpCardBox, HelpCardImage } from "./HelpCard.styled";

const HelpCard: FC = () => {
    return (
        <button type="button">
            <HelpCardBox>
                <HelpCardImage>
                    <Image
                        alt="Help agent"
                        src="/images/agent.jpg"
                        quality="80"
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </HelpCardImage>

                <div>
                    <span>Get help</span>
                    <span>Online now</span>
                </div>
            </HelpCardBox>
        </button>
    );
};

export default HelpCard;
