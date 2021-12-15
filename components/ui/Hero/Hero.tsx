import { FC } from "react";
import Image from "next/image";
import { Container } from "../Container";

const Hero: FC = () => {
    return (
        <Container>
            <div>
                <Image
                    src="/images/testing.png"
                    alt="hero image"
                    width={750}
                    height={950}
                    quality="100"
                />
            </div>
        </Container>
    );
};

export default Hero;
