export const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px 0 20px 115px;
  @media (max-width: 992px) {
    padding: 20px 0 20px 0;
  }
`;
export const FeaturesDescription = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 90%;
  align-items: center;
`;
export const FeatureList = styled.ul`
  margin-left: -2rem;
  line-height: 2rem;
  font-weight: 500;
`;

export const ApiFeaturesImage = styled.div`
  aspect-ratio: 4 / 2;
  background-image: url(/img/api-featutes.png);
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  width: 60rem;
  margin-top: 1rem;
`;

export const FeatureText = styled.div`
  width: 486px;
  margin-left: 40px;
  padding: 0 10px;
  box-sizing: border-box;
`;

export const FeatureContent = styled.div`
  margin-bottom: 0;
  line-height: 2rem;
`;

export const FeatureOption = styled.li`
  align-items: center;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-bottom: 0.8rem;
`;
