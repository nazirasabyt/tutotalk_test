import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import axios from "axios";

const UserId = () => {
  const cookies = parseCookies();
  const router = useRouter();
  const { id } = router.query;
  const [esse, setEsse] = useState();
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  const loadUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${id}?populate=*`,
        { headers }
      );
      console.log(data);
      setEsse(data.progress.esse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className='w-full bg-dimWhite h-screen'>
      <div className='flex flex-col gap-4 w-full mx-auto md:w-[1200px] px-10 py-8 text-lg'>
        <h2>Esse</h2>
        <p className='bg-accent1 bg-opacity-10 p-4 rounded-xl italic'>{esse}</p>
        <form className='flex flex-col w-1/2 gap-4'>
          <h2>Feedback</h2>
          <textarea
            placeholder='Type here...'
            className='p-2 h-20 w-full'
            value={input}
            onChange={(e) => handleChange(e)}></textarea>
          <button
            className='bg-primary p-2 rounded-xl text-white'
            type='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserId;
