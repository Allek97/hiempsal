/* eslint-disable react/require-default-props */
import Link from "next/link";
import { FC } from "react";
import Rating from "@mui/material/Rating";

import { RiCalendarCheckLine } from "react-icons/ri";

import ImageSlider from "@components/elements/ImageSlider/ImageSlider";
import { Product } from "@framework/types/product";
import colors from "@lib/const/colors";
import { useCurrency } from "@lib/useCurrency";
import { FunctionalLink } from "@components/utils";

import useReviewSummary from "@framework/review/use-review-summary";
import {
    Color,
    DeviceButton,
    DeviceInfo,
    DeviceSpecs,
    ImageWrapper,
    ReviewWrapper,
    Root,
} from "./TechArticle.styled";
import { techIcons } from "./techIcons";

interface Props {
    product: Product;
}

const TechArticle: FC<Props> = ({ product }) => {
    const currency = useCurrency(product.price);

    const getReviewSummary = useReviewSummary();
    const { data } = getReviewSummary({ productId: product.id });

    console.log(data);
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
                {data && (
                    <ReviewWrapper>
                        <Rating
                            key={data.ratingsAverage}
                            name="half-rating-read"
                            defaultValue={data.ratingsAverage}
                            // value={2}
                            precision={0.1}
                            readOnly
                            color="red"
                        />
                        <span>{data.ratingsAverage}</span>
                        <span>({data.reviewsCount})</span>
                    </ReviewWrapper>
                )}

                <p>
                    {currency} {product.price.value.toFixed(2)}
                </p>
                <span className="w-max mb-5 text-sm border-b border-accents-7 border-dashed cursor-default">
                    Free Shipping
                </span>
            </DeviceInfo>
            <DeviceSpecs>
                {Object.entries(product.features.features).map(([key, value]) =>
                    techIcons[key] ? (
                        <li key={key}>
                            {techIcons[key].icon}
                            {value.content}
                        </li>
                    ) : null
                )}
            </DeviceSpecs>
            <div className="flex items-center mb-8 text-sm">
                <h4 className="pl-0.5 mr-3 tracking-tight">Colors:</h4>
                <div className="flex space-x-2">
                    {product.options
                        .filter(
                            (element) =>
                                element.displayName.toLowerCase() === "color" ||
                                element.displayName.toLowerCase() ===
                                    "watch band"
                        )[0]
                        ?.values.map((value) => (
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
