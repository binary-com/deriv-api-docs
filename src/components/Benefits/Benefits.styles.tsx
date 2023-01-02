export const BenefitsContainer = `div
  width: 100%;
`;
export const BenefitsIcons = `div
  width: 100%;
  flex-wrap: nowrap;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 992px) {
    margin-top: 30px;
    flex-direction: column;
  }
`;

export const SingleIconContainer = `div
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BenefitsImage = `div
  background-size: contain;
  display: inline-block;
  width: 72px;
  height: 72px;
  margin: 8px;
`;

export const BenefitsInformation = `div
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  gap: 40px;
  margin: 0 auto;

  h3 {
    margin: 16px 0;
  }

  img {
    margin-bottom: 40px;
  }

  @media screen and (max-width: 992px) {
    flex-wrap: wrap;
    width: 90%;

    div {
      width: 100%;
    }

    h3 {
      margin: 1.6rem 0;
    }

    img {
      height: auto;
    }
  }
`;
export const InformationContainer = `div
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  gap: 40px;
  &:first-child {
    flex-direction: row-reverse;
  }
  div {
    width: 468px;
  }
  @media screen and (max-width: 992px) {
    flex-direction: column;
    &:first-child {
      flex-direction: column-reverse;
    }
    div {
      width: 100%;
    }
  }
`;

export const InformationImage = `div
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center;
  width: 486px;
  height: 260px;
  @media screen and (max-width: 992px) {
    max-width: 486px;
    height: 220px;
  }
  @media screen and (min-width: 320px) and (max-width: 375px) {
    height: 150px;
  }
`;
