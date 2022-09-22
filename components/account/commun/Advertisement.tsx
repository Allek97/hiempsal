import { FC } from "react";
import { useKeenSlider } from "keen-slider/react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import Image from "next/image";

const Container = styled.div`
    ${tw`flex flex-col cursor[grab] w-full`}

    ${({ theme }) => theme.layout.mainPadding}

    h3 {
        ${tw`mb-6`}
        ${({ theme }) => theme.textSize.textSizeLarge}
    }

    span {
        ${tw`mt-2`}
        ${({ theme }) => theme.textSize.textSizeMain}
    }
`;

const Slide = styled.button`
    ${tw`relative flex flex-col cursor-pointer mr-6
    min-width[72vw] min-height[72vw] border-radius[3px]
    md:(min-width[40vw] min-height[40vw])
    lg:(min-width[18.7vw] min-height[18.7vw])`}

    width: max-content !important;
    height: max-content !important;
`;

const ImageContainer = styled.div`
    ${tw`relative width[72vw] height[55vw]
    md:(width[40vw] height[30vw])
    lg:(width[18.7vw] height[14vw])`}
`;

const Advertisement: FC = () => {
    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "free",
        slides: {
            perView: "auto",
        },
    });
    return (
        <Container>
            <h3>Join the Hiempsal Community</h3>
            <div ref={ref} className="keen-slider">
                <Slide type="button" className="keen-slider__slide">
                    <ImageContainer>
                        <Image
                            src="/images/amazigh-art.jpg"
                            layout="fill"
                            className="mb-2"
                            priority
                            placeholder="blur"
                        />
                    </ImageContainer>
                    <span>Exclusive deals</span>
                </Slide>
                <Slide type="button" className="keen-slider__slide">
                    <ImageContainer>
                        <Image
                            src="/images/kabyle-shepherd.jpg"
                            layout="fill"
                            className="mb-2"
                            priority
                            placeholder="blur"
                        />
                    </ImageContainer>
                    <span>Amazigh culture</span>
                </Slide>
                <Slide type="button" className="keen-slider__slide">
                    <ImageContainer>
                        <Image
                            src="/images/amazigh-art-3.jpg"
                            layout="fill"
                            className="mb-2"
                            priority
                            placeholder="blur"
                        />
                    </ImageContainer>
                    <span>Hiempsal Events</span>
                </Slide>
            </div>
        </Container>
    );
};

export default Advertisement;
