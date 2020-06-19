const base = "REDUX";
export const types = {
  FETCH_CATEGORIES: `FETCH_CATEGORIES_${base}`
};

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  fetchCategories: categories => ({
    type: types.FETCH_CATEGORIES,
    payload: categories
  })
};
