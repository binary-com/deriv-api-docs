import React from "react";
import { Text } from "@deriv/ui";
import {
  clientLibrary,
  header,
  iconJS,
  logo,
  logoAndLink,
  libraryGoTo,
  libraryChevron,
} from "./ClientLibraries.styles";

export const ClientLibaries = () => {
  return (
    <div className={clientLibrary} data-testid="client-header">
      <div>
        <div className={iconJS}>
          <img src="/img/js-library.svg" />
        </div>
        <Text
          type="heading-2"
          bold
          align="center"
          className={header}
          role="heading"
          aria-level={1}
        >
          Comprehensive all-in-one client library
        </Text>
        <Text
          type="subtitle-1"
          align="center"
          css={{
            "font-weight": 400,
            "@mobile": { "text-align": "center" },
          }}
          role="heading"
          aria-level={4}
        >
          Use our powerful, flexible, and free API to build a custom trading{" "}
          <br />
          platform - for yourself or for your business.
        </Text>
        <div className={logo}>
          <div className={logoAndLink}>
            <a
              href="https://binary-com.github.io/deriv-api/"
              className={libraryGoTo}
              target="_blank"
            >
              <img src="/img/js.svg"></img>
              <label>Go to the JavaScript library</label>
              <img className={libraryChevron} src="/img/library-chevron.svg" />
            </a>
          </div>
          <div className={logoAndLink}>
            <a
              href="https://binary-com.github.io/python-deriv-api/"
              className={libraryGoTo}
              target="_blank"
            >
              <img src="/img/py.svg"></img>
              <label>Go to the Python library</label>
              <img className={libraryChevron} src="/img/library-chevron.svg" />
            </a>
          </div>
          <div className={logoAndLink}>
            <a
              href="https://github.com/deriv-com/flutter-deriv-api"
              className={libraryGoTo}
              target="_blank"
            >
              <img src="/img/flutter.svg"></img>
              <label>Go to the Flutter library</label>
              <img className={libraryChevron} src="/img/library-chevron.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
