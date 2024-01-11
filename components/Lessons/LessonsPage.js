import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Listbox, Transition } from "@headlessui/react";
import { FaChevronUp } from "react-icons/fa";
import { useIntl } from "react-intl";
import UseAuthContext from "@/hooks/useAuthContext";
import { Spin } from "antd";

//  Try using useMemo

const LessonsPage = ({ data, id }) => {
  const {
    state: { user },
    dispatch,
  } = UseAuthContext();
  const lessonsList = [
    { id: "beginner", name: "Beginner English" },
    { id: "elementary", name: "Elementary English" },
    { id: "pre_intermediate", name: "Pre-Intermediate English" },
    { id: "intermediate", name: "Intermediate English" },
  ];
  const defaultLesson =
    lessonsList.find((lesson) => lesson.id === user?.level) || lessonsList[0];

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(defaultLesson);
  const lessonData = data.filter((item) => item.level === selected.id);

  const intl = useIntl();
  const info = intl.formatMessage({ id: "schedule.info" });
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    dispatch({
      type: "LEVEL",
      payload: id,
    });
    localStorage.setItem("selectedLesson", id);
    updateCompletedLessons();
  }, []);

  const updateCompletedLessons = () => {
    const storedLessons = localStorage.getItem("completedLessons");
    if (storedLessons) {
      const completedLessons = JSON.parse(storedLessons).map(
        (lesson) => lesson.lesson_id
      );
      setCompleted(completedLessons);
    }
  };

  const handleSelected = async (lesson) => {
    setSelected(lesson);
  };

  return (
    <div className='w-[95%] h-full my-10 mx-auto bg-white rounded-xl p-10'>
      <div className='grid place-content-end'>
        <div className='w-60 mr-10'>
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
              <Listbox.Options className='absolute mt-1 max-h-60 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                {lessonsList.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    value={person}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
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
      {lessonData.length !== 0 ? (
        lessonData.map((item, indx) => (
          <div className='w-[90%] mx-auto flex flex-col my-3' key={indx}>
            <h2 className='text-xl my-2'>
              General English - Sprint {item.sprint}
            </h2>{" "}
            {item.lessons.map((el, indx) => (
              <Link
                key={indx}
                href={`/lessons/${id}/${el.id}`}
                className={`flex flex-col justify-center rounded-lg  border  px-4 py-2 my-1 shadow-sm text-primary button ${
                  completed.includes(el.id) ? "bg-[#62eba9]" : "bg-white"
                } `}>
                {el.name}
              </Link>
            ))}
          </div>
        ))
      ) : (
        <p className='h-screen text-center text-lg mt-4'>{info}</p>
      )}
    </div>
  );
};

export default LessonsPage;
