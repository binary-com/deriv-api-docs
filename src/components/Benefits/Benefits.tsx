import React from 'react';
import { Text } from '@deriv/ui';
import {
    BenefitsContainer,
    BenefitsIcons,
    BenefitsImage,
    SingleIconContainer
} from './Benefits.styles';
export const Benefits = () => {

    const Icon = ({ icon }) => {
        const icon_title = icon[0].toUpperCase() + icon.substring(1);
        return (
            <SingleIconContainer>
                <BenefitsImage style={{ background: `url(/img/${icon}.svg) no-repeat` }} />
                <Text
                    css={{
                        "font-size": "22px",
                        color: "var(--colors-greyDark800)",
                    }}
                >
                    {icon_title}
                </Text>
            </SingleIconContainer>
        )
    }

    return (
        <div className='main-page-row'>
            <BenefitsContainer>
            <Text
                    type='heading-2'
                    align='center'
                    bold
                    css={{
                        margin: "40px 0"
                    }}
            >
                Benefits of using Deriv API
            </Text>
                <BenefitsIcons>
                    <Icon icon='automation' />
                    <Icon icon='integration' />
                    <Icon icon='execution' />
                </BenefitsIcons>
                {/* <div className={styles.benefits}>
                    <div className={styles.personalisationContainer}>
                        <div className={styles.personalisationImage} />
                        <div className={styles.personalisation}>
                            <h3>Personalise your trading</h3>
                            <p>
                                Personalise your trading apps to match your needs. Create charts and views the way you
                                like them. Develop your trading app using any common programming language and extend
                                your trading opportunities.
                            </p>
                        </div>
                    </div>
                    <div className={styles.earnMoreContainer}>
                        <div className={styles.earnMoreImage} />
                        <div className={styles.earnMore}>
                            <h3>Build a business and earn more</h3>
                            <p>
                                Create your own trading apps by taking advantage of the power of Deriv's trading
                                services. Share your apps with fellow traders or customers, and get a chance to earn
                                more or build your own business.
                            </p>
                        </div>
                    </div>
                </div> */}
            </BenefitsContainer>
        </div>
    );
};
