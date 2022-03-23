import { FC } from "react";

import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Close from "@components/icons/Close";

import { useUI } from "@components/ui/context";

import {
    Cart,
    MenuBtn,
    Navigation,
    Profile,
    MobileNavRoot,
} from "./MobileNav.styled";
import { MobileMenu } from "..";

const MobileNav: FC = () => {
    const {
        isProductPopupOpen,
        isMobileMenuOpen,
        closeProductPopup,
        toggleMobileMenu,
    } = useUI();

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
                    isUsernavOpen={false}
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
                                isUsernavOpen={false}
                                isMobileMenuOpen={isMobileMenuOpen}
                                isProfileOpen={false}
                            >
                                <button aria-label="Cart" type="button">
                                    <Bag />
                                </button>
                            </Cart>
                            <Profile
                                isProfileOpen={false}
                                isMobileMenuOpen={isMobileMenuOpen}
                                isUsernavOpen={false}
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
