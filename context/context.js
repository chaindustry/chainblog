import Cookies from "js-cookie";
import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
const AppContext = createContext(null);

const useGlobalContext = () => {
  return useContext(AppContext);
};
const AppProvider = ({ children }) => {
  const user = Cookies.get("user");
  console.log("USer", user);
  const defaultState = {
    user: user ? JSON.parse(user) : null,
    auth: user ? true : false,
  };

  const reducer = (state, action) => {
    Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
    if (action.type === "SET_USER") {
      return {
        ...state,
        user: action.payload,
        auth: true,
      };
    }
    return state;
  };
  const [state, dispatch] = useReducer(reducer, defaultState);
  const setUser = (user) => {
    dispatch({ type: "SET_USER", payload: user });
  };

  return (
    <AppContext.Provider value={{ ...state, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useGlobalContext };
