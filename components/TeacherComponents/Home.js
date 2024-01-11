import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Link from "next/link";

function Home() {
  const [usersData, setUsersData] = useState();
  const cookies = parseCookies();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  const loadUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users?populate=*`,
        { headers }
      );
      console.log(data);
      setUsersData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className='flex gap-4 w-full mx-auto mt-4'>
      <div className='w-1/2 bg-accent1 bg-opacity-10 rounded-xl h-full p-4'>
        <h2>Schedule</h2>
        <div></div>
      </div>
      <div className='w-1/2 bg-accent1 bg-opacity-10 rounded-xl h-full p-4'>
        <h2>Esse to check</h2>
        <div className='flex flex-col mt-3 italic'>
          {usersData?.map(
            (item) =>
              item.progress?.esse && (
                <Link key={item.id} href={`/teacher/${item.id}`}>
                  {item.username}
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
