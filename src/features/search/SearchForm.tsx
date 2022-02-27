import { memo, Fragment, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setStatus } from "./slice";
import { LocalStatus } from "./types";

const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({ query: "" });

  const handleOnClick = () => {
    dispatch(
      setStatus({
        status: LocalStatus.SEARCH_SUBMIT,
        params: { ...values },
      })
    );
  };

  return (
    <Fragment>
      <p>
        Search Pokemon by name:
        <input
          id="query"
          type="text"
          aria-label="query-input"
          aria-required="true"
          name="query"
          value={values.query}
          placeholder="bulbasaur, por ejemplo"
          onChange={(e) => setValues({ query: e.target.value })}
        />
      </p>
      <button onClick={handleOnClick} disabled={values.query.length === 0}>
        Search
      </button>
    </Fragment>
  );
};

export default memo(SearchForm);
