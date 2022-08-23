import {
    AiOutlineCheck,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import Image from "next/image";
import { FC, useState } from "react";

import {
    Container,
    Header,
    Main,
    ImageContainer,
    FormInput,
    FormLabel,
    InputPlaceholder,
    PasswordBtn,
    PasswordWarn,
    ResetSubmitBtn,
} from "./Reset.styled";
import { BiCheck, BiErrorCircle } from "react-icons/bi";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import { FormSubmitBtn } from "../Commun/Form.styled";

const Reset: FC = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] =
        useState<boolean>(true);
    return (
        <Main>
            <Container>
                <Header>
                    <ImageContainer>
                        <Image
                            src="/images/hiempsal-algeria.svg"
                            alt="hiempsal company"
                            layout="fill"
                        />
                    </ImageContainer>
                    <h1>Change Your Password</h1>
                    <span>
                        Enter a new password below to change your password
                    </span>
                </Header>
                <form>
                    <div className="w-full mb-3" style={{ height: "52px" }}>
                        <FormLabel htmlFor="reset-password">
                            <FormInput
                                id="reset-password"
                                type={isPasswordHidden ? "password" : "text"}
                                required
                                placeholder=" "
                                aria-required
                                maxLength={150}
                                autoComplete="reset-password"
                            />
                            <InputPlaceholder>New password</InputPlaceholder>
                            <PasswordBtn
                                type="button"
                                onClick={() =>
                                    setIsPasswordHidden((prev) => !prev)
                                }
                                isHidden={isPasswordHidden}
                            >
                                {isPasswordHidden ? (
                                    <AiOutlineEye />
                                ) : (
                                    <AiOutlineEyeInvisible />
                                )}
                            </PasswordBtn>
                        </FormLabel>
                    </div>
                    <div className="w-full mb-2" style={{ height: "52px" }}>
                        <FormLabel htmlFor="reset-confirm-password">
                            <FormInput
                                id="reset-confirm-password"
                                type={
                                    isPasswordConfirmHidden
                                        ? "password"
                                        : "text"
                                }
                                required
                                placeholder=" "
                                aria-required
                                maxLength={150}
                                autoComplete="reset-confirm-password"
                            />
                            <InputPlaceholder>
                                Re-enter new password
                            </InputPlaceholder>
                            <PasswordBtn
                                type="button"
                                onClick={() =>
                                    setIsPasswordConfirmHidden(
                                        !isPasswordConfirmHidden
                                    )
                                }
                                isHidden={isPasswordConfirmHidden}
                            >
                                {isPasswordConfirmHidden ? (
                                    <AiOutlineEye />
                                ) : (
                                    <AiOutlineEyeInvisible />
                                )}
                            </PasswordBtn>
                        </FormLabel>
                    </div>
                    <PasswordWarn>
                        <span>Your password must contain:</span>
                        <div>
                            <AiOutlineCheck />
                            <span>At least 6 characters</span>
                        </div>
                    </PasswordWarn>
                    <div className="w-full mt-8 mb-6 ml-auto">
                        <ResetSubmitBtn isHoverActive={false}>
                            Reset password
                        </ResetSubmitBtn>
                    </div>
                </form>
            </Container>
        </Main>
    );
};

export default Reset;
