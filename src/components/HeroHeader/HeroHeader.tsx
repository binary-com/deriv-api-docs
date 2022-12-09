import React from 'react';
import { 
    heroImageStyle,
    heroContainerStyle,
    heroHeaderStyle,
    heroText
} from './CSS.HeroHeader';

export const HeroHeader = () => {
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
