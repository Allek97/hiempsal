import Link from "next/link";
import { FC } from "react";
import Rating from "@mui/material/Rating";

import { BsCpu } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";
import { GiComputerFan, GiWeightCrush } from "react-icons/gi";
import { CgDrive } from "react-icons/cg";
import { FiHardDrive } from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa";
import { RiCalendarCheckLine } from "react-icons/ri";

import ImageSlider from "@components/elements/ImageSlider/ImageSlider";

import {
    Color,
    DeviceButton,
    DeviceInfo,
    DeviceSpecs,
    ImageWrapper,
    ReviewWrapper,
    Root,
} from "./TechArticle.styled";

const TechArticle: FC = () => {
    return (
        <Root>
            <ImageWrapper>
                <ImageSlider />
            </ImageWrapper>
            <DeviceInfo>
                <Link href="/" passHref>
                    <h3>iPad Pro 12.9 2021</h3>
                </Link>
                <ReviewWrapper>
                    <Rating
                        name="half-rating-read"
                        defaultValue={4.3}
                        precision={0.1}
                        readOnly
                        color="red"
                    />
                    <span>4.3</span>
                    <span>(2819)</span>
                </ReviewWrapper>

                <p>CAD $1,299.99</p>
                <span className="w-max mb-5 text-sm border-b border-accents-7 border-dashed cursor-default">
                    Free Shipping
                </span>
            </DeviceInfo>
            <DeviceSpecs>
                <li>
                    <BsCpu />
                    11th Generation Intel® Core™ i7-1165G7
                </li>
                <li>
                    <GrSystem /> Windows 11 Pro
                </li>
                <li>
                    <GiComputerFan />
                    Intel® UHD Graphics
                </li>
                <li>
                    <CgDrive />8 GB, LPDDR4X, 4267 MHz, integrated
                </li>
                <li>
                    <FiHardDrive />
                    256GB M.2 PCIe NVMe Solid State Drive
                </li>
                <li>
                    <FaLaptopCode />
                    13.3-in. touch display
                </li>
                <li>
                    <GiWeightCrush /> Starting at 2.60 lbs
                </li>
            </DeviceSpecs>
            <div className="flex items-center mb-8 text-sm">
                <h4 className="pl-0.5 mr-3 tracking-tight">Colours:</h4>
                <div className="flex space-x-2">
                    <Color />
                    <Color color="black" />
                    <Color color="#006bbd" />
                    <Color color="white" />
                </div>
            </div>
            <div
                className="flex items-center mb-5 cursor-default"
                style={{ fontSize: "13.5px", color: "#ba4e0d" }}
            >
                <RiCalendarCheckLine
                    className="mr-2 tracking-tighter"
                    style={{ fill: "#408001", fontSize: "17px" }}
                />
                Ready to Ship
            </div>
            <Link href="/" passHref>
                <DeviceButton>Customize & Buy</DeviceButton>
            </Link>
        </Root>
    );
};

export default TechArticle;
