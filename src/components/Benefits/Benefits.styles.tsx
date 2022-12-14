import { styled } from '@linaria/react';

export const BenefitsContainer = styled.div`
    width: 100%;
`
export const BenefitsIcons = styled.div`
    width: 100%;
    flex-wrap: nowrap;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    @media screen and (max-width: 992px) {
        margin-top: 30px;
    }
`

export const SingleIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const BenefitsImage = styled.div`
    background-size: contain;
    display: inline-block;
    width: 72px;
    height: 72px;
    margin: 8px;
`
