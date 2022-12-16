import React from "react";
import { Text } from "@deriv/ui";
import {
    BenefitsContainer,
    BenefitsIcons,
    BenefitsImage,
    SingleIconContainer,
    BenefitsInformation,
    InformationContainer,
    InformationImage
} from "./Benefits.styles";
export const Benefits = () => {

    const Icon = ({ icon }) => {
        const icon_title = icon[0].toUpperCase() + icon.substring(1);
        return (
            <SingleIconContainer>
                <BenefitsImage data-testid={icon} style={{ background: `url(/img/${icon}.svg) no-repeat` }} />
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

    const ImageContainer = ({ image }) => {
        return (
            <InformationImage 
                data-testid={image} 
                style={{ background: `url(/img/${image}.png) no-repeat` }} 
            />
        )
    }

    return (
        <div data-testid="benefits" className="main-page-row">
            <BenefitsContainer>
                <Text
                    type="heading-2"
                    align="center"
                    bold
                    css={{
                        margin: "40px 0"
                    }}
                >
                    Benefits of using Deriv API
                </Text>
                <BenefitsIcons>
                    <Icon icon="automation" />
                    <Icon icon="integration" />
                    <Icon icon="execution" />
                </BenefitsIcons>
                <BenefitsInformation>
                    <InformationContainer>
                        <ImageContainer image="personalisation" />
                        <div>
                            <Text
                                bold
                                css={{
                                    "font-size": "var(--fontSizes-2xl)",
                                    "@mobile": { "font-size": "var(--fontSizes-lg)" },
                                }}
                            >
                                Personalise your trading
                            </Text>
                            <Text
                                css={{
                                    "font-size": "22px",
                                    color: "var(--colors-greyDark800)",
                                    "line-height": "2rem",
                                }}
                            >
                                Personalise your trading apps to match your needs. Create charts and views the way you
                                like them. Develop your trading app using any common programming language and extend
                                your trading opportunities.
                            </Text>
                        </div>
                    </InformationContainer>
                    <InformationContainer>
                        <ImageContainer image="build-business" />
                        <div>
                            <Text
                                bold
                                css={{
                                    "margin-top": "40px",
                                    "font-size": "var(--fontSizes-2xl)",
                                    "@mobile": { "font-size": "var(--fontSizes-lg)" },
                                }}
                            >
                               Build a business and earn more
                            </Text>
                            <Text
                                css={{
                                    "font-size": "22px",
                                    color: "var(--colors-greyDark800)",
                                    "line-height": "2rem",
                                }}
                            >
                                Create your own trading apps by taking advantage of the power of Deriv"s trading
                                services. Share your apps with fellow traders or customers, and get a chance to earn
                                more or build your own business.
                            </Text>
                        </div>
                    </InformationContainer>
                </BenefitsInformation>
            </BenefitsContainer>
        </div>
    );
};
