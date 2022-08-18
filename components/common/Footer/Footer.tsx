import { motion } from "framer-motion";
import { FC } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { constants } from "./constants";
import {
    Container,
    FooterInfo,
    FooterLocation,
    FooterNavBtn,
    FooterNavigation,
    FooterSocialBox,
    FooterSocialBtn,
    FooterSub,
    FooterUtility,
    FooterUtilityBox,
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
        <Container>
            <FooterUtilityBox>
                {constants.map((constant) => (
                    <FooterUtility key={constant.id}>
                        <motion.button type="button">
                            {constant.svg}
                        </motion.button>
                        <span>{constant.title}</span>
                        <span>{constant.subtitle}</span>
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
            <FooterInfo>
                <h3>About Hiempsal</h3>
                <p>
                    Hiempsal is a Canadian premium boutique company founded in
                    2022 providing high quality products and unique brand
                    experiences to clothing and technology enthusiasts around
                    the globe.
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
            <FooterLocation>
                <IoLocationSharp />
                <div>
                    <span>Country</span>
                    <span>Canada (EN)</span>
                </div>
            </FooterLocation>
            <FooterSub>
                <BtnSkew>Cookies</BtnSkew>
                <BtnSkew>Legal Notice</BtnSkew>
                <BtnSkew>Terms & Conditions</BtnSkew>
                <BtnSkew>Data Protection Policy</BtnSkew>
            </FooterSub>
        </Container>
    );
};

export default Footer;
