import { FEATCH_DATA } from "./actionTypes";

export const getdata = () => {
  return async (dispatch) => {
    const datamy = await fetch("http://localhost:3200/postes").then(
      (response) => response.json()
    );
    console.log(datamy);
    dispatch({ type: FEATCH_DATA, data: datamy });
  };
};
