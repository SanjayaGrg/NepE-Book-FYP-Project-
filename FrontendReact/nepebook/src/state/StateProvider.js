import React, { createContext, useContext, useReducer } from "react";
import context from "react-bootstrap/esm/AccordionContext";

export const Context = createContext();

export const StateProvider =({reducer, initialState, children})=>{
    return(
        <Context.Provider value={useReducer(reducer, initialState)}>
            {children}
        </Context.Provider> 
    )
}

export const useStateValue = () => useContext(context);