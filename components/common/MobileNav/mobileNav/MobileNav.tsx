import { FC } from "react";

import { useUI } from "@components/ui/context";
import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Close from "@components/icons/Close";

import {
    Cart,
    MenuBtn,
    Navigation,
    Profile,
    MobileNavRoot,
} from "./MobileNav.styled";
import { MobileMenu } from "../..";

const MobileNav: FC = () => {
    const { openCart, isUsernavOpen, isMobileMenuOpen, toggleMobileMenu } =
        useUI();

    return (
        <>
            <MobileMenu />
            <MobileNavRoot>
                <MenuBtn
                    aria-label="Menu"
                    type="button"
                    onClick={toggleMobileMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                    isUsernavOpen={isUsernavOpen}
                    isProfileOpen={false}
                >
                    {isMobileMenuOpen ? <Close /> : <HiOutlineMenuAlt3 />}
                </MenuBtn>
                <Navigation>
                    <Cart
                        isUsernavOpen={isUsernavOpen}
                        isMobileMenuOpen={isMobileMenuOpen}
                        isProfileOpen={false}
                    >
                        <button
                            aria-label="Cart"
                            type="button"
                            onClick={openCart}
                        >
                            <Bag />
                        </button>
                    </Cart>
                    <Profile
                        isProfileOpen={false}
                        isMobileMenuOpen={isMobileMenuOpen}
                        isUsernavOpen={isUsernavOpen}
                    >
                        <button aria-label="Profile" type="button">
                            <BsPerson />
                        </button>
                    </Profile>
                </Navigation>
            </MobileNavRoot>
        </>
    );
};

export default MobileNav;
