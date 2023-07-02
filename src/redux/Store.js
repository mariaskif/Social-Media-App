import { createStore } from "redux";
import reducer from "./reducers";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
export const store = createStore(reducer, applyMiddleware(thunk));
// export const store=createStore(reducer,composeWithDevTools());
