import { FC } from "react";
import Image from "next/image";
import { Container } from "../Container";

const Hero: FC = () => {
    return (
        <Container>
            <div>
                <Image
                    src="/images/hero-cloth.png"
                    alt="hero image"
                    width={1050}
                    height={1050}
                    quality="85"
                />
            </div>
        </Container>
    );
};

export default Hero;
