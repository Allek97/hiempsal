import { FC } from "react";

import { LoaderComponent } from "./Loader.styled";

interface Props {
    isLoading: boolean;
}

const Loader: FC<Props> = ({ isLoading }) => {
    return (
        <div className="relative">
            {isLoading && <LoaderComponent id="loader" />}
        </div>
    );
};

export default Loader;
