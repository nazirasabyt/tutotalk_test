import Image from "next/image";
import UseProgressContext from "@/hooks/useProgressContext";
import { message } from "antd";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import UseAuthContext from "@/hooks/useAuthContext";

const Result = () => {
  const { state } = UseProgressContext();
  const { dispatch } = UseAuthContext();
  const router = useRouter();
  const { id } = router.query;
  const [esseFeedback, setEsseFeedback] = useState("");
  const cookies = parseCookies();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=progress`,
          { headers }
        );

        if (res.data.progress) {
          const currentFeedback = res.data.progress.homeworkAnswers?.filter(
            (item) => item.homeworkId == id
          );
          console.log(currentFeedback[0].esseFeedback);
          setEsseFeedback(currentFeedback[0].esseFeedback);
        }
      } catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);

  return (
    <div className='homework_tab'>
      <div className='flex_row mb-5'>
        <Image
          src='/assets/end.jpg'
          alt='Vocabulary'
          width={400}
          height={200}
        />
      </div>
      <h2 className='text-lg md:text-2xl text-bluePrimary font-medium py-5 '>
        Result
      </h2>
      <h2 className='text-lg py-4 md:text-1xl flex gap-3 justify-between'>
        Vocabulary:{" "}
        <span className='px-5 py-1 text-end text-orangePrimary italic text-[16px]'>
          You aced this topic for {state.data.vocabularyPoints} %
        </span>
      </h2>
      <h2 className='text-lg py-4 md:text-1xl flex gap-3 justify-between'>
        Grammar:{" "}
        <span className='px-5 py-1 text-end text-orangePrimary italic text-[16px]'>
          You aced this topic for {state.data.grammarPoints} %
        </span>
      </h2>
      <h2 className='text-lg py-4 md:text-1xl flex gap-3 justify-between'>
        Reading:{" "}
        <span className='px-5 py-1 text-end text-orangePrimary italic text-[16px]'>
          You aced this topic for {state.data.readingPoints} %
        </span>
      </h2>
      <h2 className='text-lg py-4 md:text-1xl flex gap-3 justify-between'>
        Esse:{" "}
        <span className='px-5 py-1 text-end italic'>
          {esseFeedback ? esseFeedback : "Esse feedback is pending..."}
        </span>
      </h2>
    </div>
  );
};

export default Result;
