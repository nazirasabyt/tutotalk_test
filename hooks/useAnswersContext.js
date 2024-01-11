import { useContext } from "react";
import AnswersContext from "@/context/answers_context";

const UseAnswersContext = () => {
  return useContext(AnswersContext);
};

export default UseAnswersContext;
