import { useReducer, createContext, useEffect } from "react";

const initialState = {
  user: null,
  lessons: null,
  notifications: [],
  usersLevel: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LEVEL":
      return { ...state, usersLevel: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "LESSONS":
      return { ...state, lessons: action.payload };
    case "NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };

    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });
    dispatch({
      type: "LESSONS",
      payload: JSON.parse(localStorage.getItem("lessons")),
    });
    dispatch({
      type: "NOTIFICATIONS",
      payload: JSON.parse(localStorage.getItem("notifications")),
    });
    dispatch({
      type: "LEVEL",
      payload: localStorage.getItem("selectedLesson"),
    });
  }, []);

  // axios.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     let res = error.response;
  //     if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
  //       dispatch({ type: "LOGOUT" });
  //       localStorage.removeItem("user");
  //       router.push("/login");
  //     }
  //   }
  // );

  return (
    <Context.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
