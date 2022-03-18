import { FC } from "react";

import { useUsernavUI } from "@components/ui/usernavContext";
import { usePopupUI } from "@components/ui/popupContext";

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
import { MobileMenu } from "..";

const MobileNav: FC = () => {
    const { openCart, isUsernavOpen, isMobileMenuOpen, toggleMobileMenu } =
        useUsernavUI();

    const { isProductPopupOpen, closeProductPopup } = usePopupUI();

    const toggleMenu = () => {
        if (isProductPopupOpen) closeProductPopup();
        else toggleMobileMenu();
    };

    return (
        <>
            <MobileMenu />
            <MobileNavRoot>
                <MenuBtn
                    aria-label="Menu"
                    type="button"
                    onClick={toggleMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                    isUsernavOpen={isUsernavOpen}
                    isProfileOpen={false}
                    isProductPopupOpen={isProductPopupOpen}
                >
                    {isMobileMenuOpen || isProductPopupOpen ? (
                        <Close />
                    ) : (
                        <HiOutlineMenuAlt3 />
                    )}
                </MenuBtn>
                <Navigation>
                    {!isProductPopupOpen && (
                        <>
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
                        </>
                    )}
                </Navigation>
            </MobileNavRoot>
        </>
    );
};

export default MobileNav;
