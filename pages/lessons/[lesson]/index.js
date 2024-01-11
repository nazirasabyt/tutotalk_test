import Layout from "@/components/Shared/Layout";
import LessonsPage from "@/components/Lessons/LessonsPage";
import { parseCookies } from "nookies";
import Head from "next/head";
import axios from "axios";
import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });

const Lesson = ({ data, id }) => {
  return (
    <>
      {" "}
      <Head>
        <title>TutoTalk</title>
        <meta name='description' content='Effective Learning' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />
      </Head>
      <Layout>
        <LessonsPage data={data} id={id} />
      </Layout>
    </>
  );
};
export default Lesson;

// export async function getServerSideProps(ctx) {
//   const { lesson } = ctx.params;
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

//     const newArray = extractedData.map((obj) => {
//       const mappedLessons = obj.lessons.map((les) => {
//         return {
//           id: les.id,
//           name: les.name,
//         };
//       });
//       return {
//         level: obj.level,
//         lessons: mappedLessons,
//       };
//     });

//     return {
//       props: { data: newArray, id: lesson },
//     };
//   } catch (error) {
//     console.error("Server-side props error:", error.message);
//     return { props: { data: [] } };
//   }
// }

// caching

export async function getServerSideProps(ctx) {
  const { lesson } = ctx.params;
  const cacheKey = `lessonData-${lesson}`;
  const cachedData = myCache.get(cacheKey);

  // Return cached data if it exists
  if (cachedData) {
    return { props: { data: cachedData, id: lesson } };
  }

  const cookies = parseCookies(ctx);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  try {
    const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!apiUrl) {
      console.error("Environment variable NEXT_PUBLIC_STRAPI_URL is not set.");
      return { props: { data: [] } };
    }

    const { data } = await axios.get(
      `${apiUrl}/api/users/me?populate[${lesson}][populate]=*`,
      { headers }
    );

    const extractedData = data[lesson];
    const newArray = extractedData.map((obj) => ({
      level: obj.level,
      lessons: obj.lessons.map((les) => ({ id: les.id, name: les.name })),
    }));

    // Set data in cache
    myCache.set(cacheKey, newArray);

    return {
      props: { data: newArray, id: lesson },
    };
  } catch (error) {
    console.error("Server-side props error:", error.message);
    return { props: { data: [] } };
  }
}
