import Image from "next/image";
import { FC } from "react";
import { motion, Variants } from "framer-motion";
import { HelpCardBox, HelpCardImage } from "./HelpCard.styled";

interface Props {
    text?: string;
    isOnline?: boolean;
}

const textMotion: Variants = {
    hover: {
        skewX: "-10deg",
        transition: {
            duration: 0.3,
            ease: [0.19, 1, 0.22, 1],
        },
    },
};

const HelpCard: FC<Props> = ({ text = "Get Help", isOnline = true }) => {
    const statusText = isOnline ? "Online" : "Offline";
    return (
        <motion.button type="button" whileHover="hover">
            <HelpCardBox isOnline={isOnline}>
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
                    <motion.span variants={textMotion}>{text}</motion.span>
                    <span>{statusText}</span>
                </div>
            </HelpCardBox>
        </motion.button>
    );
};

HelpCard.defaultProps = {
    isOnline: true,
    text: "Get Help",
};

export default HelpCard;
