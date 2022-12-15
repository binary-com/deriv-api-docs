import { css } from '@linaria/core';

export const heroImageStyle = css`
        background-color: var(--brown-02);
        background-image: linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
            url(/img/header.png);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 48.8rem;
        display: flex;
        justify-content: var(--text-align-center);
        align-items: var(--text-align-center);
        padding-top: 4rem;
        
        @media screen and (max-width: 992px) {
            margin-top: 4.7rem;
            padding-top: unset;
        }

        @media screen and (min-width: 32rem) and (max-width: 42.5rem) {
            background-image: linear-gradient(rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)),
                url(/img/header-mobile.png);
            background-repeat: no-repeat;
            background-position: var(--text-align-center);
            height: 32.8rem;
        }
        
        @media screen and (min-width: 320px) and (max-width: 375px) {
            height: 37.8rem;
        }
    `

export const heroContainerStyle = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16rem 0;
        width: 100%;

        @media screen and (max-width: 99.2rem) {
            width: 100%;
            padding: 8rem 4rem;
            align-items: baseline;
        }
    `
