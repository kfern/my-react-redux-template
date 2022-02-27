import { memo, Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setStatus, selectShow, selectInput, selectError } from "./slice";
import { LocalStatus } from "./types";
import SearchForm from "./SearchForm";
import FindAndShow from "./FindAndShow";

const Search = () => {
  const show = useAppSelector(selectShow);
  const query = useAppSelector(selectInput);
  const searchError = useAppSelector(selectError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStatus({ status: LocalStatus.SEARCH_INIT }));
  }, [dispatch]);

  return (
    <Fragment>
      {show.input && <SearchForm />}
      {show.search && <FindAndShow query={query} />}
      {show.error && <p>{searchError}</p>}
    </Fragment>
  );
};

export default memo(Search);
