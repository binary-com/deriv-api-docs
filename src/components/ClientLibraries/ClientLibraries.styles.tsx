import { styled } from "@linaria/react"

export const ClientLibrary = styled.div`
  background-repeat: no-repeat;
  background-position: var(--text-align-center);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
  width: 100%;
  background: #f5f7fa
  background-size: auto
`;

export const IconJS = styled.div`
  display: flex;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LibraryLogo = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 992px){
    justify-content:center
    flex-wrap: wrap;
  }
`;

export const LogoAndLink = styled.div`
  padding: 1rem 2rem;
`;

export const LibraryGoTo = styled.a`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #ff444f;
`;

export const LibraryChevron = styled.img`
  background-repeat: no-repeat;
  background-position: var(--text-align-center);
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 0.5rem;
`;
