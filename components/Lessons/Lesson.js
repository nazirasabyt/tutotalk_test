import React, { useState, useEffect } from "react";
import Link from "next/link";
import Vocabulary from "./LessonComponents/Vocabulary";
import WordList from "./LessonComponents/WordList";
import Questions from "./LessonComponents/Questions";
import Read from "./LessonComponents/Read";
import Grammar from "./LessonComponents/Grammar";
import Results from "./LessonComponents/Results";
import Method from "./LessonComponents/Method";
import Image from "next/image";
import FactsAboutMe from "./LessonComponents/FactsAboutMe";
import Practice from "./LessonComponents/Practice";
import { arrowBack } from "@/public/assets";
import RolePlay from "./LessonComponents/RolePlay";
import OptionExercise from "./LessonComponents/OptionExercise";
import TypeExercise from "./LessonComponents/TypeExercise";
import { useRouter } from "next/router";
import UseAuthContext from "@/hooks/useAuthContext";

const Lesson = ({ data, lessonType }) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;
  console.log(lessonType);

  useEffect(() => {
    localStorage.removeItem("list");
  }, [id]);

  return (
    <div className='relative flex gap-2 sm:gap-[30px] w-[96%] md:w-[65%] justify-center items-center'>
      <div className=' bg-dimWhite w-10 h-full pt-10 px-[10px] hidden sm:block'>
        <Link href={`/lessons/${lessonType}`}>
          <Image src={arrowBack} alt='Arrow back' width={18} height={20} />
        </Link>
      </div>

      <Link
        href={`/lessons/${lessonType}`}
        className='absolute top-[50px] left-6 sm:hidden'>
        <Image src={arrowBack} alt='Arrow back' width={16} height={20} />
      </Link>

      <div className='w-[95%] sm:w-[85%] mx-auto'>
        <h1 className='py-10 text-lg sm:text-[20px] text-center font-medium'>
          {data.name}
        </h1>
        <div className='w-[98%]  mx-auto'>
          {page === 1 && (
            <div className=''>
              <Image
                width={337}
                height={120}
                src='/assets/target.jpg'
                alt='Lesson goals'
                className='flex justify-center items-center mx-auto sm:w-[437px] sm:h-[200px]'
              />

              <div className='flex flex-col my-3'>
                {" "}
                {data.factsAboutMe && (
                  <>
                    {" "}
                    <h3 className='instruction'>
                      {" "}
                      {/* <MdQuestionAnswer size={28} /> */}
                      Tell us about you!
                    </h3>
                    <div className='underline'></div>
                    <FactsAboutMe el={data} />
                  </>
                )}
                {data.pastTopic && (
                  <>
                    {" "}
                    <h3 className='instruction'>Homework Check</h3>
                    <div className='underline'></div>
                    <FactsAboutMe el={data} />
                  </>
                )}
                <div className=''>
                  {" "}
                  <h3 className='my-2 text-[20px] flex gap-2 items-center justify-center'>
                    {/* <MdQuestionAnswer size={28} /> */}
                    Lessons Goals
                  </h3>
                  <div className='underline'></div>
                  <Questions el={data} page={page} />
                </div>
              </div>
            </div>
          )}
          {page === 2 && (
            <div className='w-full mx-auto'>
              {" "}
              <Image
                src='/assets/vocab.jpg'
                className='mx-auto lg:w-[500px]'
                width={437}
                height={200}
                alt='Lesson header'
              />
              <>
                {" "}
                {data.vocabulary && (
                  <>
                    <h3 className='text-[18px] my-6 flex gap-2 items-center justify-center'>
                      Complete the sentences with missing words
                    </h3>
                    <div className='underline'></div>
                    <Vocabulary el={data} />
                  </>
                )}
                {data.practiceWords && (
                  <div>
                    <h3 className='text-[18px] mt-2 mb-4 flex gap-2 items-center justify-center'>
                      {" "}
                      Let's practice new words
                    </h3>
                    <div className='underline'></div>
                    {data?.practiceWords?.map((item, index) => (
                      <p className='text-lg  py-2' key={item.id}>
                        {index + 1} . {item.question}
                      </p>
                    ))}
                  </div>
                )}
                {data.picture && (
                  <div>
                    <h3 className='text-[18px] mt-2 mb-4 flex gap-2 items-center justify-center'>
                      {" "}
                      Complete the sentences
                    </h3>
                    <div className='underline'></div>
                    <p className='text-gray-600 flex mb-2 text-lg'>
                      {data.imgExample && data.imgExample}
                    </p>
                  </div>
                )}
              </>
            </div>
          )}
          {page === 3 && <Read data={data} />}
          {page === 4 && <RolePlay data={data} />}

          {page === 5 && <Method grammar1={data.grammar1} />}
          {data.grammar2 && page === 6 ? (
            <Grammar grammar2={data.grammar2} />
          ) : (
            ""
          )}
          {page === 7 && (
            <>
              <Image
                priority
                src='/assets/make_sentence.svg'
                width={437}
                height={200}
                className='mx-auto'
                alt='Lesson header'
              />
              {data.optionsExercise && <OptionExercise data={data} />}
              {data.typeExercise && <TypeExercise data={data} />}
            </>
          )}
          {page === 8 ? <Practice practice={data.practice} /> : ""}
          {page === 9 && <Results res={data.results} />}
          {data.wordlist && <WordList el={data} />}
        </div>
      </div>
      <div className='flex gap-2 w-[96%] md:w-[60%]  bottom-0  fixed bg-white px-6 py-[30px] justify-center'>
        {" "}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='27'
            viewBox='0 0 27 27'
            fill='#fff'>
            <rect
              width='27'
              height='27'
              rx='13.5'
              transform='matrix(-1 0 0 1 27 0)'
              fill='#134462'
            />
            <path
              d='M15 9L11 13.5L15 18'
              stroke='black'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>{" "}
        <p className='flex items-center text-lg'> {page} of 9</p>
        <button
          className=''
          onClick={() => setPage(page + 1)}
          disabled={page === 9}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='27'
            height='27'
            viewBox='0 0 27 27'
            fill='#fff'>
            <rect width='27' height='27' rx='13.5' fill='#134462' />
            <path
              d='M12 9L16 13.5L12 18'
              stroke='black'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Lesson;
