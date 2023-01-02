export const FooterContainer = styled.div`
  background-color: var(--ifm-color-black);
  display: flex;
  flex-direction: row;
  padding: 2rem;
  justify-content: space-evenly;
  margin-top: 2.5rem;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

export const FooterBody = styled.div`
  display:flex
  flex-direction:column;
  align-items:center;
`;
export const Email = styled.a`
  color: var(--ifm-color-danger);
  padding: 0 5px;
`;
