import { put } from "redux-saga/effects";
import { actions } from "../reducers/categories";

const base = "SAGA";
export const sagaCategoryTypes = {
  FETCH_CATEGORIES: `FETCH_CATEGORIES_${base}`
};

export const sagaCategoryWorkers = {
  fechCategories: function*() {
    const categories = getCategories();
    yield put(actions.fetchCategories(categories));
  }
};

const getCategories = () => {
  return JSON.parse(localStorage.getItem("Categories"));
};
