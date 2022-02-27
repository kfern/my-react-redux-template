import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Search from "./Search";

describe("Search components", () => {
  it("should have a text before search", () => {
    const { queryAllByText, getByRole, queryAllByRole } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const button = getByRole("button", { name: "Search" });
    userEvent.click(button);

    expect(queryAllByText(/searching/gi).length).toBe(0);
    expect(queryAllByRole("button", { name: "Search" }).length).toBe(1);
    expect(queryAllByText(/error/gi).length).toBe(0);
  });

  it("should search by text", () => {
    const { getByLabelText, queryAllByText, getByRole, queryAllByRole, rerender, debug } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const button = getByRole("button", { name: "Search" });
    userEvent.type(getByLabelText("query-input"), "tests");
    userEvent.click(button);

    expect(queryAllByText(/searching.*tests/gi).length).toBe(1);
    expect(queryAllByRole("button", { name: "Search" }).length).toBe(0);
    expect(queryAllByText(/error/gi).length).toBe(0);
  });
});
