import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";
import { useIntl } from "react-intl";
import UseAuthContext from "@/hooks/useAuthContext";
import { Spin } from "antd";
import axios from "axios";
import { parseCookies } from "nookies";
import UseProgressContext from "@/hooks/useProgressContext";
import Image from "next/image";

const HomeworkList = ({ data, id }) => {
  const {
    state: { user },
  } = UseAuthContext();
  const lessonsList = [
    { id: "beginner", name: "Beginner" },
    { id: "elementary", name: "Elementary" },
    { id: "pre_intermediate", name: "Pre-Intermediate" },
    { id: "intermediate", name: "Intermediate" },
  ];
  const defaultLesson =
    lessonsList.find((lesson) => lesson.id === user?.level) || lessonsList[0];

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(defaultLesson);
  const lessonData = data.filter((item) => item.level === selected.id);

  const intl = useIntl();
  const info = intl.formatMessage({ id: "schedule.info" });
  const [completed, setcompleted] = useState([]);
  const [totalScore, setTotalScore] = useState([]);
  const cookies = parseCookies();
  const { dispatch } = UseProgressContext();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  // function calculateFinalScore(student) {
  //   const totalScore =
  //     student.grammarPoints + student.readingPoints + student.vocabularyPoints;
  //   const finalScore = (totalScore / 300) * 10;
  //   return finalScore.toFixed(1);
  // }

  function calculateFinalScore(student) {
    const totalScore =
      student.grammarPoints + student.readingPoints + student.vocabularyPoints;
    const finalScore = (totalScore / 300) * 10; // Assuming each category can go up to 300
    return finalScore > 10 ? 10 : finalScore.toFixed(1); // Limiting the final score to a maximum of 10
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=progress`,
          { headers }
        );
        console.log(data);
        if (data.progress) {
          const completed = [];
          data.progress.homeworkAnswers.map((item) => {
            completed.push(item.homeworkId);
          });

          setcompleted(completed);
          let scores = [];
          data.progress.homeworkAnswers.forEach((student) => {
            const score = calculateFinalScore(student);
            const obj = {
              id: student.homeworkId,
              score,
            };
            scores.push(obj);
          });
          setTotalScore(scores);

          dispatch({
            type: "HW_COMPLETED",
            payload: completed,
          });
          localStorage.setItem("homeworkAnswers", JSON.stringify(completed));
        }
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.error(`Server responded with status ${err.response}`);
        } else if (err.request) {
          console.log("No response received from the server");
        } else {
          console.error("An error occurred while making the request");
          console.log(err);
        }
      }
    };
    init();
  }, []);

  const handleSelected = async (lesson) => {
    setSelected(lesson);
  };

  return (
    <div className='w-[95%] h-full mx-auto rounded-xl p-10 bg-white mt-10 '>
      <div className='grid place-content-start z-10'>
        <div className='w-60 ml-10 '>
          <Listbox value={selected} onChange={handleSelected}>
            <Listbox.Button className='relative w-full cursor-default rounded-lg bg-dimWhite  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-[16px]'>
              <span className='block truncate'>{selected.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FaChevronUp
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Listbox.Options className='absolute mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10'>
                {lessonsList.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 z-10 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    // disabled={person.unavailable}
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>{" "}
      {loading && (
        <div className='col_center mt-4'>
          {" "}
          <Spin />{" "}
        </div>
      )}
      <div className='mx-10 mt-5 flex flex-wrap gap-1 sm:gap-4 -z-10'>
        {lessonData.length !== 0 ? (
          lessonData.map((item) =>
            item.lessons.map((el, index) => {
              const lessonScore = totalScore.find(
                (scoreObj) => scoreObj.id === el.id
              );
              return (
                <Link href={`/homework/${id}/${el.id}`} key={index + 1}>
                  <div
                    className={`homework_cards text-center relative ${
                      completed.includes(el.id)
                        ? "bg-green-300 hover:bg-opacity-70"
                        : "bg-accent2 hover:bg-opacity-20"
                    }`}>
                    {" "}
                    {lessonScore ? (
                      <p className='text-lg font-medium absolute top-3 right-3 text-white'>
                        {" "}
                        {lessonScore.score}
                      </p>
                    ) : (
                      ""
                    )}
                    <Image
                      src='/assets/homework.jpg'
                      width={130}
                      height={80}
                      alt='Homework'
                      className='rounded-full hover:scale-75'
                    />
                  </div>
                  <h2>{el.name}</h2>
                </Link>
              );
            })
          )
        ) : (
          <p className='h-screen text-center text-lg mt-4'>
            You don't have any homework
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeworkList;
