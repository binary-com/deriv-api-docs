import { css } from '@linaria/core';

export const heroImageStyle = css`
        background-color: var(--brown-02);
        background-image: linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
            url(/img/header.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 488px;
        display: flex;
        justify-content: var(--text-align-center);
        align-items: var(--text-align-center);
        padding-top: 40px;
        
        @media screen and (max-width: 1024px) {
            margin-top: 47px;
            padding-top: unset;
        }

        @media screen and (min-width: 320px) and (max-width: 425px) {
            background-image: linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
                url(/img/header-mobile.png);
            background-repeat: no-repeat;
            background-position: var(--text-align-center);
            height: 328px;
        }
        
        @media screen and (min-width: 320px) and (max-width: 375px) {
            height: 378px;
        }
    `

export const heroContainerStyle = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 160px 0;
        width: 100%;

        @media screen and (max-width: 1024px) {
            width: 100%;
            padding: 80px 20px;
        }
    `
