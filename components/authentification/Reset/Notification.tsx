import { FC } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { VscError, VscPassFilled } from "react-icons/vsc";
import { FcExpired } from "react-icons/fc";

interface Props {
    isSuccess: boolean;
}

const Notification: FC<Props> = ({ isSuccess }) => {
    return (
        <div
            className="flex flex-col items-center self-center my-auto m-10"
            style={{ width: "320px" }}
        >
            {isSuccess ? (
                <VscPassFilled
                    className="mb-4"
                    style={{
                        height: "95px",
                        width: "95px",
                        fill: "var(--green)",
                    }}
                />
            ) : (
                <FcExpired
                    className="mb-4"
                    style={{
                        height: "95px",
                        width: "95px",
                        fill: "var(--orange-red)",
                    }}
                />
            )}

            <h1 className="mb-4 text-2xl">
                {isSuccess ? "Password Changed!" : "Session has expired!"}
            </h1>
            <span
                style={{
                    fontSize: "15px",
                    textAlign: "center",
                    lineHeight: "1.4rem",
                    color: "var(--accents-7)",
                }}
            >
                {isSuccess
                    ? "Your password has been changed successfully."
                    : 'To reset your password, return to the login page and select "Forgot Your Password" to send a new email.'}
            </span>
        </div>
    );
};

export default Notification;
