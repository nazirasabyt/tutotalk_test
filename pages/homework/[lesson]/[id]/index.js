import Tasks from "@/components/Homework/Tasks";
import { useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });
import { Spin, message } from "antd";

const Homework = ({ data, lessonType }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className='col_center mt-20'>
          {" "}
          <Spin />{" "}
        </div>
      )}
      {data && (
        <Tasks data={data} lessonType={lessonType} />
        // ) : (
        // <p className='text-center text-lg mt-5'>
        //   You do not have any tasks assigned.
        // </p>
      )}
    </>
  );
};

export default Homework;

function findLessonById(courses, lessonId) {
  let foundLesson = null;
  courses.forEach((course) => {
    course.lessons.forEach((lesson) => {
      if (lesson.id === lessonId) {
        foundLesson = lesson;
      }
    });
  });
  return foundLesson;
}

// export async function getServerSideProps(ctx) {
//   const { lesson } = ctx.params;
//   const { id } = ctx.params;
//   const cookies = parseCookies(ctx);

//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${cookies.jwt}`,
//   };

//   try {
//     const { data } = await axios.get(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[${lesson}][populate]=*`,
//       {
//         headers,
//       }
//     );
//     const extractedData = data[lesson];
//     const filteredData = findLessonById(extractedData, id);

//     return {
//       props: { data: filteredData, lessonType: lesson },
//     };
//   } catch (error) {
//     console.error("Server-side props error:", error.message);
//     return { props: { data: [] } };
//   }
// }

// with cache

export async function getServerSideProps(ctx) {
  const { lesson, id } = ctx.params;
  const cookies = parseCookies(ctx);
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  if (!apiUrl) {
    console.error("Environment variable NEXT_PUBLIC_STRAPI_URL is not set.");
    return { props: { data: [] } };
  }

  const cacheKey = `lessonData-${lesson}-${id}`;
  const cachedData = myCache.get(cacheKey);

  // Return cached data if it exists
  if (cachedData) {
    return { props: { data: cachedData, lessonType: lesson } };
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  try {
    const url = `${apiUrl}/api/users/me?populate[${lesson}][populate]=*`;
    const { data } = await axios.get(url, { headers });

    const extractedData = data[lesson];
    const filteredData = findLessonById(extractedData, id);

    // Set data in cache
    myCache.set(cacheKey, filteredData);

    return {
      props: { data: filteredData, lessonType: lesson },
    };
  } catch (error) {
    console.error("Server-side props error:", error.message);
    return { props: { data: [] } };
  }
}
