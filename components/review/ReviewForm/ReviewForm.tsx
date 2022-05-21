import { FC } from "react";
import { Container } from "@components/ui";

const ReviewForm: FC = () => {
    return (
        <form aria-label="Write A Review For This Product">
            <Container>
                <h2>Write a review</h2>
            </Container>
        </form>
    );
};

export default ReviewForm;
