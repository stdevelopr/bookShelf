import { takeLatest } from "redux-saga/effects";
import { sagaTypes, sagaWorkers } from "./books";

export default function* rootSaga() {
  yield takeLatest(sagaTypes.FETCH_STORAGE_BOOKS, sagaWorkers.fechBooks);
  yield takeLatest(sagaTypes.EDIT_BOOK, sagaWorkers.editBook);
  yield takeLatest(sagaTypes.ADD_NEW_BOOK, sagaWorkers.addBook);
  yield takeLatest(sagaTypes.DELETE_BOOK, sagaWorkers.deleteBook);
}
