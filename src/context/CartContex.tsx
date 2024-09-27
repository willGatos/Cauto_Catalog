// CartContext.js
import { createContext, Dispatch, useReducer } from "react";
import React from "react";
// Define initial state
const initialState = {
  items: [],
};

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

type CartAction = {
  // Define the structure of your actions
  type: string;
  payload?: any;
};

// Define the context type
type CartContextType = {
  state: { items: any[] };
  dispatch: Dispatch<CartAction>;
};

// Create context with a default value
export const CartContext = createContext<CartContextType>({
  state: initialState,
  dispatch: () => {}, // Default dispatch function does nothing
});

// Create provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
