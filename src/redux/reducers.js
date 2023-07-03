import { FETCH_DATA } from "./actionTypes";

const initialState = { myData: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { myData: action.data };
    default:
      return state;
  }
};
export default reducer;
