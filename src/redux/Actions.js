
import { FEATCH_DATA } from "./actionTypes"

import { PostUrl } from "./actionTypes";
// export const featchProducts=()=> (dispatch) =>{
//     fetch("http://localhost:3100/products").then(res=> res.json()).then(data=>{
//      dispatch({type: FEATCH_DATA , payload:data});
// });
// };


 export const getdata= ()=>{
    return async (dispatch)=>{
        const datamy=  await fetch("http://localhost:3200/postes").then((response)=>response.json())
       console.log(datamy)
        dispatch({type:FEATCH_DATA,data:datamy})
    }
}