import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import UseProgressContext from "@/hooks/useProgressContext";
import { message } from "antd";
import { parseCookies } from "nookies";
import UseAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/router";

const EsseComponent = ({ topic, wordlist }) => {
  const { state, dispatch } = UseProgressContext();
  const {
    state: { user },
  } = UseAuthContext();
  const [input, setInput] = useState(state.esse || "");
  const [used, setUsed] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const cookies = parseCookies();

  const intl = useIntl();

  const title = intl.formatMessage({ id: "esse.h1" });
  const p = intl.formatMessage({ id: "esse.p" });
  const label = intl.formatMessage({ id: "esse.label" });
  const span = intl.formatMessage({ id: "esse.span" });
  const submit = intl.formatMessage({ id: "esse.submit" });
  const clear = intl.formatMessage({ id: "esse.clear" });
  // const feedback = intl.formatMessage({ id: "esse.feedback" });
  const noEsse = intl.formatMessage({ id: "noEsse" });

  const handleChange = (e) => {
    const newValue = e.target.value;

    setInput(newValue);
    dispatch({
      type: "SET_DATA",
      payload: { ...state.data, esse: newValue },
    });
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  useEffect(() => {
    if (wordlist) {
      const filteredOptions = wordlist.filter((word) =>
        input.toLowerCase().includes(word.word.toLowerCase())
      );
      const test = filteredOptions.map((u) => {
        return u.word;
      });
      setUsed(test);
    }
    if (input === "") {
      setUsed([]);
    }
  }, [input]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(id));
    if (savedData && savedData.esse) {
      dispatch({ type: "SET_DATA", payload: savedData });
      setInput(savedData.esse);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedObj = JSON.parse(localStorage.getItem(id));

    if (storedObj) {
      const updatedObject = { ...storedObj };
      updatedObject.esse = input;
      localStorage.setItem(id, JSON.stringify(updatedObject));
    } else {
      const obj = {
        vocabularyPoints: "",
        grammarPoints: "",
        readingPoints: "",
        esse: input,
      };
      localStorage.setItem(id, JSON.stringify(obj));
    }
    message.success("Your esse is submitted!");
  };

  return (
    <div className='homework_tab sm:mb-[100px]'>
      {wordlist ? (
        <div className='flex gap-4 flex-col lg:flex-row'>
          <form className='flex flex-col gap-2 mb-4 w-full'>
            <label className=' text-bluePrimary font-medium'>4.{label}</label>
            <h2 className='text-xl italic text-center py-2'>{topic}</h2>
            <textarea
              className='border p-3 w-[300px] sm:w-[600px]  h-80 lg:h-[520px] mx-auto bg-[#EBF5F8] mt-2 '
              placeholder='Type here...'
              value={input}
              onChange={(e) => handleChange(e)}></textarea>
            <div className='flex justify-center gap-4 my-4'>
              {" "}
              <button
                type='button'
                onClick={handleSubmit}
                className='py-1 px-4 bg-bluePrimary text-white hover:text-orangePrimary rounded-xl'>
                {submit}
              </button>
              {/* <button
                type='button'
                onClick={handleClear}
                className='bg-dimWhite px-4 py-1 text-bluePrimary hover:text-orangePrimary rounded-xl'>
                {clear}
              </button> */}
            </div>
            {/* {feedback && (
              <div className='flex flex-col gap-3'>
                <h2>Feedback</h2>
                <p className='italic bg-white w-full p-4 rounded-xl'>
                  {feedback}
                </p>
              </div>
            )} */}
          </form>
          <div className='w-full mx-auto p-2 md:ml-10'>
            <p className='py-4 font-medium '>{p}</p>
            <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2'>
              {wordlist.map((word, index) => (
                <li
                  key={index}
                  className={
                    used.includes(word.word)
                      ? "text-green-400"
                      : "text-bluePrimary"
                  }>
                  {index + 1}. {word.word}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className='text-xl text-bluePrimary text-center px-2'>{noEsse}</p>
      )}
    </div>
  );
};

export default EsseComponent;
