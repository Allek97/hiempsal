import Close from "@components/icons/Close";
import { useProductInfo } from "@components/product/context";
import { FC } from "react";
import { CloseBtn, Feature, Root, Title } from "./Features.styled";

const Features: FC = () => {
    const { closeProductInformation } = useProductInfo();
    return (
        <Root initial={{ maxHeight: "calc(85vh - 4.2rem)" }}>
            <ul className="block w-full h-full overflow-y-auto">
                <Title>
                    <h1>Features</h1>
                    <CloseBtn
                        type="button"
                        onClick={() => {
                            closeProductInformation();
                        }}
                    >
                        <Close />
                    </CloseBtn>
                </Title>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
                <Feature>
                    <span>Item number</span>
                    <p>8465-05427</p>
                </Feature>
            </ul>
        </Root>
    );
};

export default Features;
