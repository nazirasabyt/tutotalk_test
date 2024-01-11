import {
  convertISODateToDateComponents,
  addDaysToISODate,
} from "@/utils/helper";
import Image from "next/image";
import UseAuthContext from "@/hooks/useAuthContext";
import { useEffect } from "react";

const Payments = ({ data }) => {
  const { dispatch } = UseAuthContext();
  const today = new Date();
  const formattedDate = convertISODateToDateComponents(today);
  useEffect(() => {
    const les = data.map((item) => addDaysToISODate(item.paid_date, 31));

    if (les.includes(formattedDate)) {
      dispatch({
        type: "NOTIFICATIONS",
        payload: ["Your lesson payment is due today."],
      });
      const array = ["Your lesson payment is due today."];
      const arrayAsString = JSON.stringify(array);
      array.push(arrayAsString);
      localStorage.setItem("notifications", arrayAsString);
    }
  }, []);

  return (
    <div className='w-[98%] mx-auto  h-full lg:h-[85%] mt-5 bg-white  rounded-xl relative'>
      <div className='w-[95%] mx-auto p-5'>
        {" "}
        <h1 className='text-xl'>Paid Lessons</h1>
        <div className='flex gap-4'>
          {" "}
          {data &&
            data.map((item, index) => (
              <div
                className='shadow border w-[260px] mt-4 flex flex-col gap-3 justify-center items-center p-3'
                key={index}>
                <Image
                  src='/assets/english.jpg'
                  width={200}
                  height={80}
                  alt='Lesson type'
                />
                <h2>{item.lesson_type}</h2>
                <p>
                  Paid date:{" "}
                  <span>{convertISODateToDateComponents(item.paid_date)}</span>
                </p>
                <p>
                  Due:
                  <span
                    className={
                      formattedDate == addDaysToISODate(item.paid_date, 31)
                        ? "text-red-500 px-2"
                        : "px-2"
                    }>
                    {addDaysToISODate(item.paid_date, 31)}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <p className='absolute bottom-5 text-xs right-5 text-gray-500'>
        {" "}
        Image by{" "}
        <a href='https://www.freepik.com/free-vector/hand-drawn-english-school-illustration_29765282.htm#page=3&query=english%20lesson&position=33&from_view=search&track=ais'>
          Freepik
        </a>
      </p>
    </div>
  );
};

export default Payments;
