import { styled } from '@linaria/react';

export const HeroImageStyle = styled.div`
  background-color: var(--brown-02);
  background-image: linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), url(/img/header.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 488px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  @media screen and (max-width: 992px) {
    margin-top: 47px;
    padding-top: unset;
  }

  @media screen and (min-width: 320px) and (max-width: 375px) {
    height: 378px;
  }
`;

export const HeroContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160px 0;
  width: 100%;

  @media screen and (max-width: 992px) {
    width: 100%;
    padding: 80px 40px;
    align-items: baseline;
  }
`;
