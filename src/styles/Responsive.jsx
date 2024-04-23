import { css } from "styled-components";

export const mobile1 = (resCss) => {
    return css`
        @media only screen and (max-width: 620px) {
            ${resCss};
        }
    `;
};
export const mobile2 = (resCss) => {
    return css`
        @media only screen and (max-width: 780px) {
            ${resCss};
        }
    `;
};