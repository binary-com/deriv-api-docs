import React from 'react';
import { css } from '@linaria/core';

export const HeroHeader = () => {
    const heroImageStyle = css`
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
        
        @media screen and (max-width: 1024px) {
            margin-top: 4.7rem;
            padding-top: unset;
        }

        @media screen and (min-width: 320px) and (max-width: 425px) {
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

    const heroContainerStyle = css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16rem 0;
        width: 100.8rem;

        @media screen and (max-width: 1024px) {
            width: 100%;
            padding: 8rem 2rem;
        }
    `

    const heroHeaderStyle = css`
        padding: 0;
        max-width: 77.5rem;
        font-size: var(--text-size-xxl);
        font-weight: 700;
        line-height: var(--text-lh-xs);
        text-align: var(--text-align-center);
        color: var(--white);
        margin-bottom: 1.6rem;

        @media screen and (max-width: 1024px) {
            max-width: unset;
        }

        @media screen and (min-width: 320px) and (max-width: 425px) {
            font-size: var(--text-size-l);
            text-align: left;
            width: 100%;
        }
    `

    const heroText = css`
        font-size: 2.4rem;
        font-weight: 400;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: var(--text-align-center);
        color: var(--white);
        margin-bottom: 0;

        @media screen and (min-width: 320px) and (max-width: 425px) {
            font-size: var(--text-size-sm);
            margin-bottom: 1.2rem;
            text-align: var(--text-align-left);
        }
    `

    return (
        <div data-testid="hero-header" className={heroImageStyle}>
            <div className={heroContainerStyle}>
                <h1 className={heroHeaderStyle}>Deriv API</h1>
                <h2 className={heroText}>
                    Use our powerful, flexible, and free API to build a custom trading <br />
                    platform - for yourself or for your business.
                </h2>
            </div>
        </div>
    );
};
