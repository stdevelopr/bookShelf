const base = "REDUX";
export const types = {
  FETCH_COMMENTS: `FETCH_COMMENTS_${base}`,
  ADD_COMMENT: `ADD_COMMENT_${base}`,
  EDIT_COMMENT: `EDIT_COMMENT_${base}`,
  DELETE_COMMENT: `DELETE_COMMENT_${base}`
};

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_COMMENTS:
      return action.payload;

    case types.ADD_COMMENT:
      return action.payload;

    case types.EDIT_COMMENT:
      return action.payload;

    case types.DELETE_COMMENT:
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  fetchComments: comments => ({
    type: types.FETCH_COMMENTS,
    payload: comments
  }),
  addComment: comments => ({ type: types.ADD_COMMENT, payload: comments }),
  editComment: comments => ({ type: types.EDIT_COMMENT, payload: comments }),
  deleteComment: comments => ({ type: types.DELETE_COMMENT, payload: comments })
};
