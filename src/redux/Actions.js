import { FETCH_DATA  } from "./actionTypes";

export const getData = () => {
  return async (dispatch) => {
    const myData = await fetch("http://localhost:3200/postes").then(
      (response) => response.json()
    );
    console.log(myData);
    dispatch({ type: FETCH_DATA, data: myData });
  };
};

