import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { message } from "antd";
import Link from "next/link";
import UseProgressContext from "@/hooks/useProgressContext";

const Results = ({ res }) => {
  const { state, dispatch } = UseProgressContext();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const completedLesson = { lesson_id: id }; // Use an object instead of an array

    // Get the current state from local storage
    const storedData =
      JSON.parse(localStorage.getItem("completedLessons")) || [];

    // Check if the lesson_id already exists in the stored data
    const isDuplicate = storedData.some((lesson) => lesson.lesson_id === id);

    if (!isDuplicate) {
      // If it's not a duplicate, add it to the stored data
      storedData.push(completedLesson);

      // Update the state
      dispatch({
        type: "LESSONS_COMPLETED",
        payload: { ...state.lessonsCompleted, completedLesson },
      });
      // Update the local storage
      localStorage.setItem("completedLessons", JSON.stringify(storedData));
      message.success("Lesson completed!");
    }
  }, []);

  return (
    <div className=' text-gray-800'>
      <Image
        priority
        src='/assets/end.jpg'
        width={437}
        height={200}
        alt='Lesson Results'
        className='mx-auto'
      />
      <Link
        href='https://www.freepik.com/free-vector/man-who-thinks-idea-is-admired-by-thumbs-up_11879378.htm#page=5&query=well%20done&position=16&from_view=search&track=ais'
        className='text-xs text-dimWhite'>
        Image by jcomp on Freepik
      </Link>
      <h2 className='instruction my-3'>Today we have learned:</h2>
      <div className='underline'></div>
      <div className='flex flex-col'>
        {res.map((el) => (
          <p key={el.id} className='py-2 text-[16px] sm:text-lg'>
            {el.result}
          </p>
        ))}
      </div>
      <h2 className='instruction my-3'>Homework</h2>{" "}
      <div className='underline'></div>
      <div className='flex flex-col'>
        {res.map((el, index) => (
          <p key={el.id} className='py-2 text-[16px] sm:text-lg'>
            {el.homework && index + 1}. {el.homework}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Results;
