import { FC } from "react";
import useCustomer from "@framework/customer/use-customer";
import { Account } from "../commun";

const Overview: FC = () => {
    const { data: customer } = useCustomer();

    return <Account>OVERVIEW</Account>;
};

export default Overview;
