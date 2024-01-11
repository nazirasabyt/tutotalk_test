import { useReducer, createContext, useEffect } from "react";

const initialState = {
  wordList: null,
  shuffledItems: null,
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case "SPRINT_TASK":
      return { ...state, wordList: action.payload };

    default:
      return state;
  }
};

export const HomeworkContext = createContext(initialState);

export const HomeworkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    const storedWordList = localStorage.getItem("wordList");
    if (storedWordList) {
      dispatch({
        type: "SPRINT_TASK",
        payload: JSON.parse(storedWordList),
      });
    }
  }, []);

  return (
    <HomeworkContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </HomeworkContext.Provider>
  );
};

export default HomeworkContext;
