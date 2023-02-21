import { createContext, useReducer } from "react";
const ThemeContext = createContext();

const initialData = {
  theme:
    localStorage.getItem("mtTheme") === null
      ? "light"
      : localStorage.getItem("mtTheme") === "light"
      ? "light"
      : "dark",
};

//,

const reducer = (firstState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...firstState, theme: action.newValue };
    default:
      return firstState;
  }
};

export function ThemeProvider({ children }) {
  const [firstState, dispatch] = useReducer(reducer, initialData);
  const toggleTheme = (newName) => {
    localStorage.setItem("mtTheme", newName);
    dispatch({ type: "CHANGE_THEME", newValue: newName });
  };

  return (
    <ThemeContext.Provider value={{ ...firstState, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;