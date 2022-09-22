import { motion } from "framer-motion";
import Image from "next/image";
import { FC } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { constants } from "./constants";
import {
    FooterContainer,
    FooterInfo,
    FooterLocation,
    FooterNavBtn,
    FooterNavigation,
    FooterDescription,
    FooterSocialBox,
    FooterSocialBtn,
    FooterSub,
    FooterUtility,
    FooterUtilityBox,
    FooterPayments,
    MoreBtn,
} from "./Footer.styled";

const BtnSkew: FC = ({ children }) => {
    return (
        <motion.button
            type="button"
            style={{ transformOrigin: "bottom center" }}
            whileHover={{ skewX: "-10deg" }}
        >
            {children}
        </motion.button>
    );
};

const Footer: FC = () => {
    return (
        <FooterContainer>
            <FooterUtilityBox>
                {constants.map((constant) => (
                    <FooterUtility key={constant.id}>
                        <button type="button">{constant.svg}</button>
                        <div className="flex flex-col items-center lg:items-start">
                            <span>{constant.title}</span>
                            <span>{constant.subtitle}</span>
                        </div>
                    </FooterUtility>
                ))}
            </FooterUtilityBox>
            <FooterNavigation>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Support</h1>
                </FooterNavBtn>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Account</h1>
                </FooterNavBtn>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Wish List</h1>
                </FooterNavBtn>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Outlet</h1>
                </FooterNavBtn>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Hiempsal Technology Shop</h1>
                </FooterNavBtn>
                <FooterNavBtn type="button" aria-label="Support">
                    <HiOutlineArrowNarrowRight />
                    <h1>Newsletter</h1>
                </FooterNavBtn>
            </FooterNavigation>

            <FooterDescription>
                <FooterInfo>
                    <h3>About Hiempsal</h3>
                    <p>
                        Hiempsal is a Canadian premium boutique company founded
                        in 2022 providing high quality products and unique brand
                        experiences to clothing and tech enthusiasts around the
                        globe.
                    </p>
                </FooterInfo>
                <FooterSocialBox>
                    <div>
                        <h3>Follow</h3>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Instagram</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Facebook</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Youtube</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Strava</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Pinterest</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Linkedin</h1>
                        </FooterSocialBtn>
                    </div>
                    <div>
                        <h3>Company</h3>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Responsablity</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Newsroom</h1>
                        </FooterSocialBtn>
                        <FooterSocialBtn type="button" aria-label="Support">
                            <HiOutlineArrowNarrowRight />
                            <h1>Careers</h1>
                        </FooterSocialBtn>
                    </div>
                </FooterSocialBox>
            </FooterDescription>

            <div className="flex flex-col w-full">
                <FooterLocation>
                    <IoLocationSharp />
                    <div>
                        <span>Country</span>
                        <span>Canada (EN)</span>
                    </div>
                </FooterLocation>
                <div className="flex items-center">
                    <FooterSub>
                        <BtnSkew>Cookies</BtnSkew>
                        <BtnSkew>Legal Notice</BtnSkew>
                        <BtnSkew>Terms & Conditions</BtnSkew>
                        <BtnSkew>Data Protection Policy</BtnSkew>
                    </FooterSub>
                    <FooterPayments>
                        <div
                            className="relative h-3 mr-6"
                            style={{ width: "120px" }}
                        >
                            <Image
                                src="https://images.ctfassets.net/l595fda2nfqd/5T0A57hTiC843tS2k2RWL1/e50c7c50fd6655c2006c18e797f17f60/american-express.svg"
                                alt="American express"
                                layout="fill"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <div
                            className="relative h-5 mr-6"
                            style={{ width: "56px" }}
                        >
                            <Image
                                src="https://images.ctfassets.net/l595fda2nfqd/1wmQsWYBIj5gN5htnt7zaQ/e6c0a3f2ad065d431762b68ee5fdec71/paypal.svg"
                                alt="American express"
                                layout="fill"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <div
                            className="relative h-6 mr-6"
                            style={{ width: "56px" }}
                        >
                            <Image
                                src="https://images.ctfassets.net/l595fda2nfqd/1wmQsWYBIj5gN5htnt7zaQ/e6c0a3f2ad065d431762b68ee5fdec71/paypal.svg"
                                alt="American express"
                                layout="fill"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <div>
                            <MoreBtn isSelected>
                                <HiOutlineArrowNarrowRight />
                                <h1>More</h1>
                            </MoreBtn>
                        </div>
                    </FooterPayments>
                </div>
            </div>
        </FooterContainer>
    );
};

export default Footer;
