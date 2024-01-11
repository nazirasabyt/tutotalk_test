import Layout from "@/components/Shared/Layout";
import axios from "axios";
import { parseCookies } from "nookies";
import Link from "next/link";

const Lessons = ({ data }) => {
  return (
    <Layout>
      <div className='m-10 flex gap-3'>
        {" "}
        {data.length > 0 ? (
          data.map((item, index) => (
            <Link
              key={index}
              href={`/lessons/${item.slug}`}
              className='p-10 bg-white w-[257px] h-[192px] text-primary col_center rounded-xl border  hover:animate-pulse'>
              <h1 className='text-lg font-medium'>{item.name}</h1>
              {/* <p>{ item.desc}</p> */}
            </Link>
          ))
        ) : (
          <p>You don't have any lessons</p>
        )}
      </div>
    </Layout>
  );
};

export default Lessons;

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate[lessons_lists][populate]=*`,
      {
        headers,
      }
    );

    return {
      props: { data: data.lessons_lists },
    };
  } catch (error) {
    console.error("Server-side props error:", error.message);
    return { props: { data: [] } };
  }
}
