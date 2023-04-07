import { createContext, useReducer } from "react";

// @ts-ignore
export const FirstContext = createContext()
const initialData = {
  count:0,
  housam:4,
  hassan:5,
  profileUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
};
const INCREAMENT = 'INCREAMENT'
const DECREAMENT = 'DECREAMENT'
function reducer(state, action) {
  switch (action.type) {
    case INCREAMENT:
      return {...state,count: initialData.count += action.payload}
    case DECREAMENT:
      return {...state,count: initialData.count -= action.payload}
    default:
      return initialData.count;
  }
}

export default function ListProvider({children}) {
  const [{...state}, dispatch] = useReducer(reducer, initialData);
  const increaseNumber = ()=>{
    dispatch({type:INCREAMENT,payload:5})
  }
  const decreaseNumber = ()=>{
    dispatch({type:DECREAMENT,payload:5})
  }
  return (
    <FirstContext.Provider value={{...state,increaseNumber,decreaseNumber}}>
      {children}
    </FirstContext.Provider>
  );
}
