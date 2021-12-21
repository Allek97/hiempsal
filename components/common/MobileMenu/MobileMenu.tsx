import { FC } from "react";
import Bag from "@components/icons/Bag";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Cart, MenuBtn, Navigation, Profile, Root } from "./MobileMenu.styled";

const MobileMenu: FC = () => {
    return (
        <Root>
            <MenuBtn aria-label="To menu" type="button">
                <HiOutlineMenuAlt3 />
            </MenuBtn>
            <Navigation>
                <Cart>
                    <button aria-label="Cart" type="button">
                        <Bag />
                    </button>
                </Cart>
                <Profile>
                    <button aria-label="Profile" type="button">
                        <BsPerson />
                    </button>
                </Profile>
            </Navigation>
        </Root>
    );
};

export default MobileMenu;
