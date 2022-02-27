import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";

import SearchAndShow from "./SearchAndShow";

describe("SearchAndShow", () => {
  it("should render", () => {
    const { getByText } = render(
      <Provider store={store}>
        <SearchAndShow query="test" />
      </Provider>
    );
    expect(getByText(/search.*test/gi)).toBeInTheDocument();
  });
});
