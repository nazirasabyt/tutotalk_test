import { useState, useEffect } from "react";
import Layout from "@/components/Shared/Layout";
import Schedule from "@/components/Dashboard/Schedule";
import Homework from "@/components/Dashboard/Homework";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import { useIntl } from "react-intl";
import Lessons from "@/components/Dashboard/Lessons";
import UseAuthContext from "@/hooks/useAuthContext";

const Platform = () => {
  const [toggle, setToggle] = useState(false);
  // console.log(data);
  const intl = useIntl();
  const hello = intl.formatMessage({ id: "greeting" });

  const lessons = intl.formatMessage({ id: "lessons" });
  const progress = intl.formatMessage({ id: "progress" });
  const payments = intl.formatMessage({ id: "payments" });
  const grammar = intl.formatMessage({ id: "grammar" });
  const homework = intl.formatMessage({ id: "homework" });
  const logout = intl.formatMessage({ id: "logout" });
  const schedule = intl.formatMessage({ id: "schedule.h1" });
  const { state } = UseAuthContext();
  // console.log(state);
  const router = useRouter();
  const { locale } = useRouter();

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const bishkekTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bishkek",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  }).format(currentTime);

  return (
    <>
      <Layout>
        <div className='flex flex-col md:flex-row justify-center items-center md:gap-10 w-[96%] mx-auto p-2 sm:p-0'>
          <Schedule />
          <div className='w-[95%] md:w-[510px]'>
            <Homework />
            <Lessons />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Platform;

// export async function getServerSideProps(ctx) {
//   const cookies = parseCookies(ctx);

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${cookies.jwt}`,
//   };

//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=notifications`,
//       {
//         headers,
//       }
//     );

//     // Extract the JSON-serializable data from the response
//     const { data } = response;

//     return {
//       props: { data },
//     };
//   } catch (error) {
//     console.error("Server-side props error:", error.message);
//     return { props: { data: [] } };
//   }
// }
