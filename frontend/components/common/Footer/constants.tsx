import { FaPhoneAlt } from "react-icons/fa";
import { GiFalconMoon } from "react-icons/gi";
import { IoMdChatbubbles } from "react-icons/io";
import { MdEmail } from "react-icons/md";

type Constant = {
    id: number;
    title: string;
    subtitle: string;
    svg: JSX.Element;
};

const constants: Constant[] = [
    {
        id: 1,
        title: "Chat",
        subtitle: "We are currently online",
        svg: <IoMdChatbubbles />,
    },
    {
        id: 2,
        title: "Email",
        subtitle: "We usually reply within 48 hours",
        svg: <MdEmail />,
    },
    {
        id: 3,
        title: "Call us",
        subtitle: "Mon-Fri: 8am-5pm GMT",
        svg: <FaPhoneAlt />,
    },
    {
        id: 4,
        title: "Feedback",
        subtitle: "Always a good idea 🚀",
        svg: <GiFalconMoon />,
    },
];

export { constants };
