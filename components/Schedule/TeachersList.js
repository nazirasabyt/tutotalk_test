import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { parseCookies } from "nookies";
import UseAuthContext from "@/hooks/useAuthContext";

const TeachersList = () => {
  const [teachersList, setTeachersList] = useState([]);

  const cookies = parseCookies();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/teachers`,
        { headers }
      );

      // console.log(res, "res");
      if (data) {
        const list = data.data.map((item) => {
          const obj = {
            name: item.attributes.name,
            id: item.attributes.slug,
          };

          return obj;
        });
        setTeachersList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {teachersList &&
        teachersList.map((teacher) => (
          <div key={teacher.id}>
            <h1>{teacher.name}</h1>
          </div>
        ))}
    </div>
  );
};

export default TeachersList;
