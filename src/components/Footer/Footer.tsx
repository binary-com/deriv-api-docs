import React from "react";
import { Button, Text } from "@deriv/ui";
import { footerContainer, footerBody,link,communityButton } from "./Footer.styles";

export const Footer = () => {
  const handleClick= (e)=>{
    e.preventDefault();
    window.location.href='https://binary.vanillacommunity.com/';
  }
  return (
    <div data-testid="hero-header" className={footerContainer}>
      <div className={footerBody}>
        <Text
          type="subtitle-1"
          bold
          css={{
            color: "White",
            "@mobile": { "font-size": "32px" },
          }}
          role="heading"
        >
          Get Connected
        </Text>
        <Text
          type="paragraph-1"
          align="center"
          css={{
            color: "$greyLight500",
            "font-weight": 400,
            "@mobile": { "font-size": "24px" },
          }}
          role="heading"
        >
          Discuss ideas and share solutions with developers worldwide.
        </Text>
        <Button
        className={communityButton}
        color= "monochrome"
        onClick={handleClick}
        >
            Join Our Community
        </Button>
      </div>
      <div className={footerBody}>
        <Text
        type="subtitle-1"
        bold
        css={{
          color: "White",
          "@mobile": { "font-size": "24px" },
        }}
        role="heading"
        aria-level={3}
        >
            We're here to help
        </Text>
        <Text
        type="paragraph-1"
        align="center"
        css={{
          color:"$greyLight500",
          "font-weight": 400,
          "display":"flex",
          "flexWrap":"wrap",
          "@mobile": { "text-align": "left" },
        }}
        role="heading"
        aria-level={7}
        >
            Email us at <a className={link}> api-support@deriv.com</a>
            if you have any questions.

        </Text>
      </div>
    </div>
  );
};
