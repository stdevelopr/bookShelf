import { takeLatest } from "redux-saga/effects";
import { sagaCategoryTypes, sagaCategoryWorkers } from "./categories";
import { sagaBookTypes, sagaBookWorkers } from "./books";
import { sagaCommentTypes, sagaCommentWorkers } from "./comments";

export default function* rootSaga() {
  yield takeLatest(
    sagaCategoryTypes.FETCH_CATEGORIES,
    sagaCategoryWorkers.fechCategories
  );
  yield takeLatest(
    sagaBookTypes.FETCH_STORAGE_BOOKS,
    sagaBookWorkers.fechBooks
  );
  yield takeLatest(sagaBookTypes.EDIT_BOOK, sagaBookWorkers.editBook);
  yield takeLatest(sagaBookTypes.ADD_NEW_BOOK, sagaBookWorkers.addBook);
  yield takeLatest(sagaBookTypes.DELETE_BOOK, sagaBookWorkers.deleteBook);
  yield takeLatest(sagaCommentTypes.ADD_COMMENT, sagaCommentWorkers.addComment);
  yield takeLatest(
    sagaCommentTypes.FETCH_COMMENTS,
    sagaCommentWorkers.fetchComments
  );
  yield takeLatest(
    sagaCommentTypes.EDIT_COMMENT,
    sagaCommentWorkers.editComment
  );
  yield takeLatest(
    sagaCommentTypes.DELETE_COMMENT,
    sagaCommentWorkers.deleteComment
  );
}
