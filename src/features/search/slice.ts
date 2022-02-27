import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as Slice from "./types";
import { ApiError } from "../../app/api";

const initialShow: Slice.LocalShow = {
  input: false,
  search: false,
  error: false,
};

export const initialState: Slice.LocalState = {
  input: "",
  status: Slice.LocalStatus.IDLE,
  show: initialShow,
  error: "",
};

const getTextError = (query: string, error: ApiError): string => {
  let textError = `Oh no! An error occurred while searching for "${query}":`;
  if (Slice.isFetchBaseQueryErrorType(error)) {
    // now you can access error.data
    textError = `${textError} ${error.data ? `'${error.data}'` : ""} (${error.status})`;
  }
  return textError;
};

export const slice = createSlice({
  name: "search",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStatus: (state, action: PayloadAction<Slice.SetStatusPayload>) => {
      switch (action.payload.status) {
        case Slice.LocalStatus.SEARCH_INIT:
          state.show = { ...initialShow, input: true };
          break;
        case Slice.LocalStatus.SEARCH_SUBMIT:
          state.input = action.payload.params.query;
          state.show = { ...initialShow, search: true };
          break;
        case Slice.LocalStatus.SEARCH_ERROR:
          state.error = getTextError(state.input, action.payload.params.error);
          state.show = { ...initialShow, input: true, error: true };
          break;
        default:
          break;
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: {},
});

// Actions
export const { setStatus } = slice.actions;

// Selectors
export const selectShow = (state: RootState) => state.search.show;
export const selectInput = (state: RootState) => state.search.input;
export const selectError = (state: RootState) => state.search.error;

// default
export default slice.reducer;
