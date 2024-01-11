import { useReducer, createContext, useEffect } from "react";

const initialState = {
  sprintPoints: null,
  sprintAnswers: null,
  lessons: null,
  shuffledItems: null,
  lessonsCompleted: [],
  homeworkAnswers: [],
  data: {
    id: "",
    vocabularyPoints: "",
    esse: "",
    grammarPoints: "",
    readingPoints: "",
    esseFeedback: "",
  },
};

const rootReducer = (state, action) => {
  switch (action.type) {
    case "SPRINT":
      return { ...state, sprintPoints: action.payload };
    case "SPRINT_ANSWERS":
      return { ...state, sprintAnswers: action.payload };
    case "SHUFFLE":
      return { ...state, shuffledItems: action.payload };
    case "LESSONS_COMPLETED":
      return {
        ...state,
        lessonsCompleted: action.payload,
      };
    case "HW_COMPLETED":
      return {
        ...state,
        homeworkAnswers: action.payload,
      };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const ProgressContext = createContext(initialState);

export const ProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "SPRINT",
      payload: JSON.parse(localStorage.getItem("sprintPoints")),
    });
    dispatch({
      type: "SPRINT_ANSWERS",
      payload: JSON.parse(localStorage.getItem("sprintAnswers")),
    });

    dispatch({
      type: "ESSEFEEDBACK",
      payload: localStorage.getItem("esseFeedback"),
    });
    dispatch({
      type: "SHUFFLE",
      payload: JSON.parse(localStorage.getItem("shuffledItems")),
    });
    dispatch({
      type: "LESSONS_COMPLETED",
      payload: JSON.parse(localStorage.getItem("completedLessons")),
    });
    dispatch({
      type: "HW_COMPLETED",
      payload: JSON.parse(localStorage.getItem("homeworkAnswers")),
    });
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContext;
