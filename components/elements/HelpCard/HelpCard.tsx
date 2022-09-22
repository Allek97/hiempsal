import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
import { useUI } from "@components/ui/context";
import { HelpCardBox, HelpCardImage } from "./HelpCard.styled";
import { textMotion } from "./motions";

interface Props {
    text?: string;
    isOnline?: boolean;
}

const HelpCard: FC<Props> = ({ text = "Get Help", isOnline = true }) => {
    const { openHelp } = useUI();

    const statusText = isOnline ? "Online" : "Offline";
    return (
        <motion.button
            type="button"
            whileHover="hover"
            onClick={() => {
                openHelp();
            }}
        >
            <HelpCardBox isOnline={isOnline}>
                <HelpCardImage>
                    <Image
                        alt="Help agent"
                        src="/images/agent.jpg"
                        quality="80"
                        layout="fill"
                        objectFit="cover"
                        priority
                        placeholder="blur"
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
