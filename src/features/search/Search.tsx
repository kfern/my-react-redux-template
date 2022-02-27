import { memo, Fragment, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setStatus, selectShow, selectInput, selectError } from "./slice";
import { LocalStatus, SearchFormData } from "./types";
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

  const handleSearchSubmit = (data: SearchFormData) => {
    dispatch(
      setStatus({
        status: LocalStatus.SEARCH_SUBMIT,
        params: { ...data },
      })
    );
  };

  return (
    <Fragment>
      {show.input && <SearchForm handleSubmit={handleSearchSubmit} />}
      {show.search && <FindAndShow query={query} />}
      {show.error && <p>{searchError}</p>}
    </Fragment>
  );
};

export default memo(Search);
