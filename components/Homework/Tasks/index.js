import React, { useState } from "react";
import Choose from "./Exercises/Choose";
import { Tab } from "@headlessui/react";
import { useIntl } from "react-intl";
import Vocabulary from "./Exercises/Vocabulary";
import EsseComponent from "./Exercises/Esse";
import Read from "./Exercises/Read";
import { CgLogOut } from "react-icons/cg";
import Result from "./Exercises/Result";
import Popup from "./Exercises/Popup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  " 1. Vocabulary",
  " 2. Grammar",
  " 3. Read",
  " 4. Esse",
  " 5. Result",
];

const Tasks = ({ data, lessonType }) => {
  const [confirmExit, setConfirmExit] = useState(false);
  console.log(data);

  const handleExit = () => {
    setConfirmExit(true);
  };

  const intl = useIntl();

  const p = intl.formatMessage({ id: "noHomework" });
  const h1 = intl.formatMessage({ id: "homework.h1" });

  return (
    <div className='w-[94%] h-screen mx-auto flex flex-col gap-2 mt-5'>
      {data ? (
        <Tab.Group>
          <div className='flex flex-col sm:flex-row gap-6'>
            <Tab.List className='relative grid grid-cols-2 sm:flex sm:flex-col md:w-[20%] bg-white rounded-xl md:h-full py-4 sm:py-8 pl-4 sm:justify-start sm:items-start'>
              {tabs.map((t, indx) => (
                <Tab
                  key={indx + 1}
                  className={({ selected }) =>
                    classNames(
                      "homewrok_nav",
                      selected ? " text-accent1 " : " "
                    )
                  }>
                  {t}
                </Tab>
              ))}

              <div className='absolute z-10  left-[200px] -bottom-[150px] sm:bottom-[90px] sm:left-10'>
                {confirmExit && <Popup lessonType={lessonType} />}
              </div>
              <button
                onClick={handleExit}
                className='gap-1 sm:p-2 sm:absolute sm:bottom-5 sm:left-4  homewrok_nav text-center'>
                <CgLogOut size={26} className='hidden sm:flex' />
                Exit
              </button>
            </Tab.List>
            <Tab.Panels className='w-[96%] mx-auto bg-white rounded-xl h-full p-5'>
              {" "}
              <Tab.Panel>
                <Vocabulary vocabulary={data?.homework?.vocabulary} />
              </Tab.Panel>
              <Tab.Panel className='pb-[120px]'>
                {" "}
                <Choose grammarTask={data?.homework?.grammar} />
              </Tab.Panel>
              <Tab.Panel>
                <Read
                  readQuiz={data?.homework?.read?.readQuiz}
                  readText={data?.homework?.read?.text}
                />
              </Tab.Panel>
              <Tab.Panel>
                <EsseComponent
                  topic={data?.homework?.esse_topic}
                  wordlist={data?.wordlist}
                />
              </Tab.Panel>
              <Tab.Panel className='pb-[120px]'>
                <Result />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      ) : (
        <div className='bg-blueLight bg-opacity-10 w-full sm:w-[86%] py-10 mx-auto rounded-lg shadow-md mt-4'>
          <p className='text-xl text-bluePrimary text-center px-2'>{p}</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
