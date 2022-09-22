import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
    AiOutlineCheck,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import { object, SchemaOf, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiErrorCircle } from "react-icons/bi";
import { MdOutlineError } from "react-icons/md";

import useResetPassword, {
    ResetPasswordInput,
} from "@framework/auth/use-reset-password";

import Notification from "./Notification";

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
    FormError,
} from "./Reset.styled";

type ResetForm = {
    password: string;
    passwordConfirm: string;
};

const formSchema: SchemaOf<ResetForm> = object({
    password: string()
        .required("Password is required")
        .min(8, "At least 8 characters"),
    passwordConfirm: string()
        .required("You need to submit a compatible password")
        .test("passwords-match", "Passwords don't match", function (value) {
            return this.parent.password === value;
        }),
});

const Reset: FC = () => {
    // input values
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const [isPasswordConfirmHidden, setIsPasswordConfirmHidden] =
        useState<boolean>(true);
    // form errors
    const [isPasswordErrorShown, setIsPasswordErrorShown] =
        useState<boolean>(false);
    const [isPasswordConfirmError, setIsPasswordConfirmError] =
        useState<boolean>(false);
    // session state
    const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
    const [isSessionSuccess, setIsSessionSuccess] = useState<boolean>(false);

    const router = useRouter();
    const { id, token }: { id?: string; token?: string } = router.query;

    const methods = useForm<ResetForm>({
        resolver: yupResolver(formSchema),
    });

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = methods;

    useEffect(() => {
        if (password) setIsPasswordErrorShown(true);
        if (password.length >= 8) setIsPasswordConfirmError(false);
    }, [password]);

    useEffect(() => {
        if (errors.passwordConfirm?.message?.startsWith("Passwords")) {
            setPassword("");
            setPasswordConfirm("");
            setIsPasswordConfirmError(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors.passwordConfirm?.message]);

    const resetPassword = useResetPassword();
    async function onSubmit(): Promise<void> {
        try {
            setIsSessionSuccess(false);
            setIsSessionExpired(false);
            const input: ResetPasswordInput = {
                id: id ?? "",
                input: {
                    resetToken: token ?? "",
                    password: password,
                },
            };

            await resetPassword(input);
            setIsSessionSuccess(true);
            reset({
                password: "",
                passwordConfirm: "",
            });
        } catch (error) {
            console.log(error);
            reset({
                password: "",
                passwordConfirm: "",
            });
            setIsSessionExpired(true);
        }
    }

    return (
        <Main
            className={
                isSessionSuccess || isSessionExpired ? "flex items-center" : ""
            }
        >
            <Container>
                {isSessionSuccess || isSessionExpired ? (
                    <Notification isSuccess={isSessionSuccess} />
                ) : (
                    <>
                        <Header>
                            <ImageContainer>
                                <Image
                                    src="/images/hiempsal-algeria.svg"
                                    alt="hiempsal company"
                                    layout="fill"
                                    placeholder="blur"
                                    priority
                                />
                            </ImageContainer>
                            <h1>Change Your Password</h1>
                            <span>
                                Enter a new password below to change your
                                password
                            </span>
                        </Header>
                        <form
                            aria-label="Reset Password"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div
                                className="w-full mb-3"
                                style={{ height: "52px" }}
                            >
                                <FormLabel
                                    htmlFor="reset-password"
                                    $isError={isPasswordConfirmError}
                                >
                                    <FormInput
                                        {...register("password")}
                                        id="reset-password"
                                        type={
                                            isPasswordHidden
                                                ? "password"
                                                : "text"
                                        }
                                        required
                                        placeholder=" "
                                        aria-required
                                        maxLength={150}
                                        autoComplete="reset-password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <InputPlaceholder>
                                        New password
                                    </InputPlaceholder>
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
                            <div>
                                <div
                                    className="w-full mb-1.5"
                                    style={{ height: "52px" }}
                                >
                                    <FormLabel
                                        htmlFor="reset-confirm-password"
                                        $isError={isPasswordConfirmError}
                                    >
                                        <FormInput
                                            {...register("passwordConfirm")}
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
                                            value={passwordConfirm}
                                            onChange={(e) =>
                                                setPasswordConfirm(
                                                    e.target.value
                                                )
                                            }
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
                                {isPasswordConfirmError && (
                                    <FormError>
                                        <MdOutlineError />
                                        Passwords don't match
                                    </FormError>
                                )}
                            </div>

                            {isPasswordErrorShown && (
                                <PasswordWarn>
                                    <span>Your password must contain:</span>
                                    <div className="flex items-center">
                                        {password.length < 8 ? (
                                            <BiErrorCircle
                                                style={{
                                                    fill:
                                                        password.length < 8
                                                            ? "var(--orange-red)"
                                                            : "#3b976f",
                                                }}
                                                className="w-4 h-auto"
                                            />
                                        ) : (
                                            <AiOutlineCheck
                                                style={{
                                                    fill:
                                                        password.length < 8
                                                            ? "var(--orange-red)"
                                                            : "#3b976f",
                                                }}
                                                className="w-4 h-auto"
                                            />
                                        )}

                                        <span
                                            style={{
                                                color:
                                                    password.length < 8
                                                        ? "var(--orange-red)"
                                                        : "#3b976f",
                                            }}
                                        >
                                            At least 8 characters
                                        </span>
                                    </div>
                                </PasswordWarn>
                            )}
                            <div className="w-full mt-8 mb-6 ml-auto">
                                <ResetSubmitBtn
                                    isHoverActive={false}
                                    type="submit"
                                >
                                    Reset password
                                </ResetSubmitBtn>
                            </div>
                        </form>
                    </>
                )}
            </Container>
        </Main>
    );
};

export default Reset;
