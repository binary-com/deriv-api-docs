import React from "react";
import { Button, Text } from "@deriv/ui";
import { footerContainer } from "./Footer.styles";

export const Footer = () => {
  return (
    <div data-testid="hero-header" className={footerContainer}>
      <div>
        <Text
          type="heading-3"
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
            color: "White",
            "font-weight": 400,
            "@mobile": { "text-align": "left" },
          }}
          role="heading"
        >
          Discuss ideas and share solutions with developers worldwide.
        </Text>
        <Button>
            Join Our Community
        </Button>
      </div>
      <div>
        <Text
        type="heading-3"
        bold
        css={{
          color: "White",
          "@mobile": { "font-size": "32px" },
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
          color: "White",
          "font-weight": 400,
          "@mobile": { "text-align": "left" },
        }}
        role="heading"
        aria-level={7}
        >
            Email us at api-support@deriv.com api-support@deriv.com
            if you have any questions.

        </Text>
      </div>
    </div>
  );
};
