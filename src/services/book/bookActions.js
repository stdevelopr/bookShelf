import { SET_BOOK_VIEW } from "./bookTypes";

export const setBookView = (vw = "") => {
  console.log("AQUI", vw);
  return {
    type: SET_BOOK_VIEW,
    payload: vw
  };
};
