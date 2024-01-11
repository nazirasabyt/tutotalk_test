import Layout from "@/components/Shared/Layout";
import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import HomeworkList from "@/components/Homework";
import { Spin, message } from "antd";
import NodeCache from "node-cache";
const myCache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });

const Homework = ({ data, id }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      {loading && (
        <div className='col_center mt-4'>
          {" "}
          <Spin />{" "}
        </div>
      )}
      {data ? (
        <HomeworkList data={data} id={id} />
      ) : (
        <p className='text-lg text-center p-5'>You don't have any homework!</p>
      )}
    </Layout>
  );
};

export default Homework;

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
