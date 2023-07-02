import { FC } from "react";
import { Userlist, Usernav } from "@components/common";
import useViewed from "@framework/viewed/use-viewed";
import { getViewedToken } from "@framework/utils/viewed-token";

interface Props {
    customerId: string | null;
}

const ViewedProduct: FC<Props> = ({ customerId }) => {
    const useGetViewed = useViewed();

    const { data: viewedProducts } = useGetViewed({
        customerId: customerId ?? undefined,
        viewedToken: getViewedToken(),
    });

    return (
        <Usernav>
            <Userlist
                variant="product-viewed"
                products={viewedProducts?.products ?? []}
            />
        </Usernav>
    );
};

export default ViewedProduct;
