import React from 'react';
import { Text } from '@deriv/ui';
import {
    heroImageStyle,
    heroContainerStyle,
} from './CSS.HeroHeader';

export const HeroHeader = () => {
    return (
        <div data-testid="hero-header" className={heroImageStyle}>
            <div className={heroContainerStyle}>
                <Text
                    color="primary"
                    type="heading-1"
                    bold="true"
                    css={{
                        'margin-bottom': '1.2rem',
                        '@mobile': {
                            'font-size': '32px',
                            'margin-bottom': '2.4rem',
                            'text-align': 'left',
                        }
                    }}
                >
                    Deriv API
                </Text>
                <Text
                    color="primary"
                    type="subtitle-1"
                    align="center"
                    css={{
                        'font-weight': 400,
                        '@mobile': {
                            'margin-bottom': '1.2rem',
                            'text-align': 'left',
                        }
                    }}
                >
                    Use our powerful, flexible, and free API to build a custom trading <br />
                    platform - for yourself or for your business.
                </Text>
            </div>
        </div>
    );
};
