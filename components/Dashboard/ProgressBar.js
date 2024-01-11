import { useState, useEffect } from "react";
import UseProgressContext from "@/hooks/useProgressContext";
import Link from "next/link";
import { useIntl } from "react-intl";
import axios from "axios";
import { parseCookies } from "nookies";
import { message, Spin } from "antd";
import { useRouter } from "next/router";

const ProgressBar = ({ barWidth }) => {
  const { dispatch, state } = UseProgressContext();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;
  const div =
    "flex gap-3 justify-between items-center bg-[#EBF5F8] rounded-[10px] px-4";
  const intl = useIntl();

  const title = intl.formatMessage({ id: "homework" });
  const start = intl.formatMessage({ id: "start" });
  const grammar = intl.formatMessage({ id: "grammar" });
  const sprint = intl.formatMessage({ id: "sprint" });
  const esse = intl.formatMessage({ id: "esse" });
  const audio = intl.formatMessage({ id: "audio" });
  const wrongMes = intl.formatMessage({ id: "wrongMes" });

  const sprintFillHeight =
    Math.round(state?.sprintPoints && state?.sprintPoints) + "%";
  const grammarFillHeight =
    Math.round(state?.data.grammarPoints && state?.data.grammarPoints) + "%";
  const readFillHeight =
    Math.round(state?.data.readingPoints && state?.data.readingPoints) + "%";
  const vocabularyFillHeight =
    Math.round(state?.data.vocabularyPoints && state?.data.vocabularyPoints) +
    "%";

  return (
    <>
      {" "}
      {loading ? (
        <div className='flex justify-center items-center my-10'>
          <Spin />
        </div>
      ) : (
        <div className='mt-4 text-[16px] sm:text-lg p-2  mb-6 text-gray-800 flex flex-col gap-5'>
          <div className={`${div}`}>
            <p className='lg:w-[200px] py-3'>{sprint}</p>
            <div className='flex items-center gap-x-4'>
              <div
                className={`progress-bar-container ${
                  currentRoute == "/platform"
                    ? "w-[95%] sm:w-[225px]"
                    : "w-[95%] sm:w-[295px]"
                }`}>
                <div
                  className='progress-bar-fill'
                  style={{
                    width: sprintFillHeight,
                    backgroundColor: "#50C878",
                  }}></div>
              </div>
              <p>{sprintFillHeight}</p>
            </div>
          </div>
          <div className={`${div}`}>
            <p className='lg:w-[200px] py-3 '>{grammar}</p>
            <div className='flex items-center gap-x-4'>
              <div
                className={`progress-bar-container ${
                  currentRoute == "/platform"
                    ? "w-[95%] sm:w-[225px]"
                    : "w-[95%] sm:w-[295px]"
                }`}>
                <div
                  className='progress-bar-fill'
                  style={{
                    width: grammarFillHeight,
                    backgroundColor: "#50C878",
                  }}></div>
              </div>
              <p>{grammarFillHeight}</p>
            </div>
          </div>
          <div className={`${div}`}>
            <p className='lg:w-[200px] py-3'>Reading </p>
            <div className='flex items-center gap-x-4'>
              {" "}
              <div
                className={`progress-bar-container ${
                  currentRoute == "/platform"
                    ? "w-[95%] sm:w-[225px]"
                    : "w-[95%] sm:w-[295px]"
                }`}>
                <div
                  className='progress-bar-fill'
                  style={{
                    width: readFillHeight,
                    backgroundColor: "#50C878",
                  }}></div>
              </div>
              <p>{readFillHeight}</p>
            </div>
          </div>
          <div className={`${div}`}>
            <p className='lg:w-[200px] py-3'>Vocabulary</p>
            <div className='flex items-center gap-x-4'>
              <div
                className={`progress-bar-container ${
                  currentRoute == "/platform"
                    ? "w-[95%] sm:w-[225px]"
                    : "w-[95%] sm:w-[295px]"
                }`}>
                <div
                  className='progress-bar-fill'
                  style={{
                    width: vocabularyFillHeight,
                    backgroundColor: "#50C878",
                  }}></div>
              </div>
              <p>{vocabularyFillHeight}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressBar;
