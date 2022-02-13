import { FaCcMastercard, FaCcVisa, FaIdeal, FaPaypal } from "react-icons/fa";
import { SiKlarna } from "react-icons/si";

const payments = [
    {
        id: 1,
        icon: <FaCcVisa />,
        title: "Visa",
    },
    {
        id: 2,
        icon: <FaPaypal />,
        title: "Paypal",
    },
    {
        id: 3,
        icon: <FaCcMastercard />,
        title: "Mastercard",
    },
    {
        id: 4,
        icon: <FaIdeal />,
        title: "Ideal",
    },
    {
        id: 5,
        icon: <SiKlarna />,
        title: "Klarna",
    },
];

export default payments;
