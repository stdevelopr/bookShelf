import { all, takeEvery } from "redux-saga/effects";

import { fetchStorageBooks } from "./books";

export default function* rootSaga() {
  yield all([fetchStorageBooks()]);
}
