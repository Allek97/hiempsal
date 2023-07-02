// BUG https://github.com/emotion-js/emotion/issues/2193
/* NOTE Workaround when passing props to custom styled-components to make sure that
the props are not passed to to the rendered DOM element or passed further down the component hierarchy */

import { CreateStyled } from "@emotion/styled";

export const transientOptions: Parameters<CreateStyled>[1] = {
    shouldForwardProp: (propName: string) => !propName.startsWith("$"),
};
