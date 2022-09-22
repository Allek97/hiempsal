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

const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
    // eslint-disable-next-line no-bitwise
    keyStr.charAt(e1 >> 2) +
    // eslint-disable-next-line no-bitwise
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    // eslint-disable-next-line no-bitwise
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    // eslint-disable-next-line no-bitwise
    keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
        triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

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
                        placeholder="blur"
                        alt="Help agent"
                        src="/images/agent.jpg"
                        layout="fill"
                        objectFit="cover"
                        priority
                        blurDataURL={rgbDataURL(237, 181, 6)}
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
