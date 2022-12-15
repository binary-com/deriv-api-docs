import { css } from "@linaria/core";

export const footerContainer = css`
  background-color: var(--ifm-font-color-base);
  display: flex;
  flex-direction: row;
  padding: 2rem;
  justify-content: space-evenly;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    gap:2rem;
  }
`;

export const footerBody = css`
display:flex
flex-direction:column;
align-items:center;
`;
export const link = css`
  color: var(--ifm-color-danger);
`;

export const communityButton = css`
  border: 1px var(--ifm-color-secondary);
`;
