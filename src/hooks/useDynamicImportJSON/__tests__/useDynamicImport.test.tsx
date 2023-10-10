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
    });
    expect(result.current.request_info).toEqual({
      $schema: "http://json-schema.org/draft-04/schema#",
      title: "Active Symbols (response)",
      description: "A message containing the list of active symbols.",
      type: "object",
      required: ["echo_req", "msg_type"],
      properties: {
        active_symbols: {
          title: "active_symbols",
          description: "List of active symbols.",
          type: "array",
          items: {
            description: "The information about each symbol.",
            type: "object",
            additionalProperties: false,
            required: [
              "display_name",
              "display_order",
              "exchange_is_open",
              "is_trading_suspended",
              "market",
              "market_display_name",
              "pip",
              "subgroup",
              "subgroup_display_name",
              "submarket",
              "submarket_display_name",
              "symbol",
              "symbol_type",
            ],
            properties: {
              allow_forward_starting: {
                description:
                  "`1` if the symbol is tradable in a forward starting contract, `0` if not.",
                type: "integer",
                enum: [0, 1],
              },
              delay_amount: {
                description:
                  "Amount the data feed is delayed (in minutes) due to Exchange licensing requirements. Only returned on `full` active symbols call.",
                type: "integer",
              },
              display_name: {
                description: "Display name.",
                type: "string",
              },
              display_order: {
                description: "Display order.",
                type: "integer",
              },
              exchange_is_open: {
                description: "`1` if market is currently open, `0` if closed.",
                type: "integer",
                enum: [0, 1],
              },
              exchange_name: {
                description:
                  "Exchange name (for underlyings listed on a Stock Exchange). Only returned on `full` active symbols call.",
                type: "string",
              },
              intraday_interval_minutes: {
                description:
                  "Intraday interval minutes. Only returned on `full` active symbols call.",
                type: "integer",
              },
              is_trading_suspended: {
                description:
                  "`1` indicates that trading is currently suspended, `0` if not.",
                type: "integer",
                enum: [0, 1],
              },
              market: {
                description: "Market category (forex, indices, etc).",
                type: "string",
              },
              market_display_name: {
                description: "Translated market name.",
                type: "string",
              },
              pip: {
                description: "Pip size (i.e. minimum fluctuation amount).",
                type: "number",
              },
              quoted_currency_symbol: {
                description:
                  "For stock indices, the underlying currency for that instrument. Only returned on `full` active symbols call.",
                type: "string",
              },
              spot: {
                description:
                  "Latest spot price of the underlying. Only returned on `full` active symbols call.",
                type: ["null", "number"],
              },
              spot_age: {
                description:
                  "Number of seconds elapsed since the last spot price. Only returned on `full` active symbols call.",
                type: "string",
              },
              spot_percentage_change: {
                description:
                  "Daily percentage for a symbol. Only returned on 'full' active symbols call.",
                type: "string",
              },
              spot_time: {
                description:
                  "Latest spot epoch time. Only returned on `full` active symbols call.",
                type: "string",
              },
              subgroup: {
                description: "Subgroup name.",
                type: "string",
              },
              subgroup_display_name: {
                description: "Translated subgroup name.",
                type: "string",
              },
              submarket: {
                description: "Submarket name.",
                type: "string",
              },
              submarket_display_name: {
                description: "Translated submarket name.",
                type: "string",
              },
              symbol: {
                description: "The symbol code for this underlying.",
                type: "string",
              },
              symbol_type: {
                description: "Symbol type (forex, commodities, etc).",
                type: "string",
              },
            },
          },
        },
        echo_req: {
          description: "Echo of the request made.",
          type: "object",
        },
        msg_type: {
          description: "Action name of the request made.",
          type: "string",
          enum: ["active_symbols"],
        },
        req_id: {
          description:
            "Optional field sent in request to map to response, present only when request contains `req_id`.",
          type: "integer",
        },
      },
    });
  });
});
