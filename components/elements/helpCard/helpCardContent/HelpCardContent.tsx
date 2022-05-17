import { FC } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { Header } from "@components/product/ProductInformation/commun";
import { MdOutlineMarkEmailRead } from "react-icons/md";

import {
    HIEMPSAL_EMAIL,
    HIEMPSAL_PHONE_NUMBER,
    HIEMPSAL_WORKING_HOURS,
} from "@lib/const/contact";
import { containerMotion } from "@components/product/ProductInformation/commun/Container";
import { useProductInfo } from "@components/product/context";

import { Root } from "./HelpCardContent.styled";
import { textMotion } from "../motions";

const HelpCardContent: FC = () => {
    const { isProductOverviewOpen } = useProductInfo();
    return (
        <Root
            initial="hidden"
            animate="visible"
            variants={containerMotion(isProductOverviewOpen)}
            exit="exit"
            key="HelpCardContent"
        >
            <motion.div exit={{ opacity: 0, transition: { duration: 0 } }}>
                <div className="flex items-center">
                    <RiCustomerService2Line className="mr-6 w-6 h-6" />
                    <Header
                        title="How can we help you ? "
                        withBorder={false}
                        withSidePaddings={false}
                    />
                </div>

                <li className="cursor-pointer">
                    <FiPhoneCall className="mr-6 w-5 h-5" />
                    <div className="flex flex-col">
                        <motion.h2 variants={textMotion} whileHover="hover">
                            Call
                        </motion.h2>
                        <span className="text-accents-7 mb-1">
                            {HIEMPSAL_WORKING_HOURS}
                        </span>
                        <span>{HIEMPSAL_PHONE_NUMBER}</span>
                    </div>
                </li>
                <li className="cursor-pointer">
                    <MdOutlineMarkEmailRead className="mr-6 w-6 h-6" />
                    <div className="block">
                        <motion.h2 variants={textMotion} whileHover="hover">
                            Email
                        </motion.h2>
                        <span>{HIEMPSAL_EMAIL}</span>
                    </div>
                </li>
            </motion.div>
        </Root>
    );
};

export default HelpCardContent;
