import { FEATCH_DATA } from "./actionTypes";

const initialState = { mydata: [] };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FEATCH_DATA:
      return { mydata: action.data };
    default:
      return state;
  }
};
export default reducer;
