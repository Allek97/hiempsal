/* eslint-disable react/require-default-props */
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
import { Product } from "@framework/types/product";
import colors from "@lib/const/colors";
import { useCurrency } from "@lib/useCurrency";
import useReview from "@framework/review/use-review";
import { FunctionalLink } from "@components/utils";

import {
    Color,
    DeviceButton,
    DeviceInfo,
    DeviceSpecs,
    ImageWrapper,
    ReviewWrapper,
    Root,
} from "./TechArticle.styled";

interface Props {
    product: Product;
}

const TechArticle: FC<Props> = ({ product }) => {
    const { processor, operatingSystem, gpu, display, hardDrive, ram, weight } =
        product.features.features;

    const currency = useCurrency(product.price);

    const getUseReview = useReview();
    const { data: review } = getUseReview({
        productId: product.id,
    });

    return (
        <Root>
            <ImageWrapper>
                <ImageSlider images={product.images} />
            </ImageWrapper>
            <DeviceInfo>
                <Link href={`/products/${product.slug}`} passHref>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a>
                        <h3>{product.name}</h3>
                    </a>
                </Link>
                {!!review && !!review.length && (
                    <ReviewWrapper>
                        <Rating
                            key={review[0].ratingsAverage}
                            name="half-rating-read"
                            defaultValue={review[0].ratingsAverage}
                            // value={2}
                            precision={0.1}
                            readOnly
                            color="red"
                        />
                        <span>{review[0].ratingsAverage}</span>
                        <span>({review.length})</span>
                    </ReviewWrapper>
                )}

                <p>
                    {currency} {product.price.value}
                </p>
                <span className="w-max mb-5 text-sm border-b border-accents-7 border-dashed cursor-default">
                    Free Shipping
                </span>
            </DeviceInfo>
            <DeviceSpecs>
                <li>
                    <BsCpu />
                    {processor.content}
                </li>
                <li>
                    <GrSystem />
                    {operatingSystem.content}
                </li>
                <li>
                    <GiComputerFan />
                    {gpu.content}
                </li>
                <li>
                    <CgDrive />
                    {ram.content}
                </li>
                <li>
                    <FiHardDrive />
                    {hardDrive.content}
                </li>
                <li>
                    <FaLaptopCode />
                    {display.content}
                </li>
                <li>
                    <GiWeightCrush /> Starting at {weight.content}
                </li>
            </DeviceSpecs>
            <div className="flex items-center mb-8 text-sm">
                <h4 className="pl-0.5 mr-3 tracking-tight">Colors:</h4>
                <div className="flex space-x-2">
                    {product.options
                        .filter(
                            (element) =>
                                element.displayName.toLowerCase() === "color"
                        )[0]
                        .values.map((value) => (
                            <Color
                                color={colors[value.label]}
                                key={value.label}
                            />
                        ))}
                </div>
            </div>
            <div
                className="flex items-center mb-5 cursor-default"
                style={{ fontSize: "13.5px" }}
            >
                <RiCalendarCheckLine
                    className="mr-2 tracking-tighter"
                    style={{ fill: "var(--green)", fontSize: "17px" }}
                />
                Ready to Ship
            </div>

            <Link href={`/products/${product.slug}`} passHref>
                <FunctionalLink>
                    <DeviceButton>Customize & Buy</DeviceButton>
                </FunctionalLink>
            </Link>
        </Root>
    );
};

export default TechArticle;
