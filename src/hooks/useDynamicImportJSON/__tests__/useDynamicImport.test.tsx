import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import useDynamicImportJSON from "..";
import { cleanup, render, screen } from "@testing-library/react";

jest.mock("@docusaurus/router", () => ({
  useLocation: () => ({
    pathname: "/api-explorer#active_symbols",
    hash: "#active_symbols",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@site/src/hooks/useAuthContext");

describe("useDynamicImportJSON", () => {
  const { result } = renderHook(() => useDynamicImportJSON());

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should populate text data with the correct values", () => {
    act(() => {
      expect(result.current.text_data).toEqual({
        request:
          '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
        selected_value: "Active Symbols",
        name: "active_symbols",
      });
    });
  });

  it("should be able to call handleTextAreaInput when typing in a textarea", async () => {
    const spyHandleInputFunction = jest.spyOn(
      result.current,
      "handleTextAreaInput"
    );

    render(
      <textarea
        placeholder="testtextarea"
        onChange={result.current.handleTextAreaInput}
      />
    );

    const textarea = screen.getByPlaceholderText("testtextarea");
    expect(textarea).toBeVisible();

    await userEvent.type(textarea, "test123");
    expect(spyHandleInputFunction).toHaveBeenCalled();
  });

  it("should have the correct hash value in the URL on selection of an api call", () => {
    const location = require("@docusaurus/router").useLocation();
    const url = location.hash;
    expect(url).toMatch("active_symbols");
  });

  it("should check for change in hash value and update text data accordingly", async () => {
    jest.mock("@site/src/utils/playground_requests", () => ({
      playground_requests: [
        {
          name: "active_symbols",
          title: "Active Symbols",
          body: {
            active_symbols: "brief",
            product_type: "basic",
          },
        },
      ],
    }));

    jest.mock("@docusaurus/router", () => ({
      useLocation: () => ({
        pathname: "/api-explorer#active_symbols",
        hash: "#active_symbol",
      }),
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));

    const mockEvent = {
      currentTarget: {
        value: "active_symbols",
      },
      preventDefault: jest.fn(),
    };

    const spyHandleSelectChange = jest.spyOn(
      result.current,
      "handleSelectChange"
    );

    const mockHandleSelectChange = () =>
      result.current.handleSelectChange(mockEvent, "active_symbols");

    render(
      <div>
        <button
          className="simulated_option"
          onClick={() => mockHandleSelectChange()}
        >
          Active Symbols
        </button>
      </div>
    );

    const option = screen.getByRole("button", { name: "Active Symbols" });

    await userEvent.click(option);

    expect(spyHandleSelectChange).toHaveBeenCalled();

    expect(result.current.text_data).toEqual({
      request: '{\n  "active_symbols": "brief",\n  "product_type": "basic"\n}',
      selected_value: "Active Symbols",
      name: "active_symbols",
    });
  });

  it("should have correct text area inputs inside dynamic imports correctly", () => {
    act(() => {
      result.current.dynamicImportJSON(result.current.text_data.selected_value);
      console.log(result.current.request_info);
    });
    expect(result.current.request_info).toEqual({
      $schema: "http://json-schema.org/draft-04/schema#",
      additionalProperties: false,
      auth_required: 0,
      default: {
        $schema: "http://json-schema.org/draft-04/schema#",
        additionalProperties: false,
        auth_required: 0,
        description:
          "Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).",
        properties: {
          active_symbols: {
            description:
              "If you use `brief`, only a subset of fields will be returned.",
            enum: ["brief", "full"],
            type: "string",
          },
          landing_company: {
            description: "Deprecated - replaced by landing_company_short.",
            enum: [
              "iom",
              "malta",
              "maltainvest",
              "svg",
              "virtual",
              "vanuatu",
              "champion",
              "champion-virtual",
            ],
            type: "string",
          },
          landing_company_short: {
            description:
              "[Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.",
            enum: [
              "iom",
              "malta",
              "maltainvest",
              "svg",
              "virtual",
              "vanuatu",
              "champion",
              "champion-virtual",
            ],
            type: "string",
          },
          passthrough: {
            description:
              "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field. Maximum size is 3500 bytes.",
            maxSize: 3500,
            type: "object",
          },
          product_type: {
            description:
              "[Optional] If you specify this field, only symbols that can be traded through that product type will be returned.",
            enum: ["basic"],
            type: "string",
          },
          req_id: {
            description: "[Optional] Used to map request to response.",
            type: "integer",
          },
        },
        required: ["active_symbols"],
        title: "Active Symbols (request)",
        type: "object",
      },
      description:
        "Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).",
      properties: {
        active_symbols: {
          description:
            "If you use `brief`, only a subset of fields will be returned.",
          enum: ["brief", "full"],
          type: "string",
        },
        landing_company: {
          description: "Deprecated - replaced by landing_company_short.",
          enum: [
            "iom",
            "malta",
            "maltainvest",
            "svg",
            "virtual",
            "vanuatu",
            "champion",
            "champion-virtual",
          ],
          type: "string",
        },
        landing_company_short: {
          description:
            "[Optional] If you specify this field, only symbols available for trading by that landing company will be returned. If you are logged in, only symbols available for trading by your landing company will be returned regardless of what you specify in this field.",
          enum: [
            "iom",
            "malta",
            "maltainvest",
            "svg",
            "virtual",
            "vanuatu",
            "champion",
            "champion-virtual",
          ],
          type: "string",
        },
        passthrough: {
          description:
            "[Optional] Used to pass data through the websocket, which may be retrieved via the `echo_req` output field. Maximum size is 3500 bytes.",
          maxSize: 3500,
          type: "object",
        },
        product_type: {
          description:
            "[Optional] If you specify this field, only symbols that can be traded through that product type will be returned.",
          enum: ["basic"],
          type: "string",
        },
        req_id: {
          description: "[Optional] Used to map request to response.",
          type: "integer",
        },
      },
      required: ["active_symbols"],
      title: "Active Symbols (request)",
      type: "object",
    });
  });
});
