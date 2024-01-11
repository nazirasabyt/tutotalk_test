import { useState, useEffect } from "react";
import Navigation from "@/components/Shared/Nav";
import Head from "next/head";
import { parseCookies } from "nookies";
import Welcome from "./Welcome";
import { useRouter } from "next/router";
import { routeInfo } from "../../utils/constants";

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const router = useRouter();
  const currentRoute = router.pathname;

  const routeData = routeInfo[currentRoute] || { title: "", text: "" };
  const cookies = parseCookies();

  useEffect(() => {
    if (cookies.jwt) {
      setIsLoggedIn(true);
    }
    setTitle(routeData.title);
    setText(routeData.text);
  }, []);

  return (
    <>
      {isLoggedIn && (
        <div>
          <Head>
            <title>TutoTalk</title>
            <meta name='description' content='Effective Learning' />

            <link rel='icon' href='/favicon.ico' />
            <link rel='manifest' href='/manifest.json' />
          </Head>
          <div className='flex flex-col sm:flex-row'>
            <div className=''>
              <Navigation />
            </div>{" "}
            <div className='flex flex-col flex-grow md:ml-[240px]'>
              <Welcome title={title} text={text} />
              <div className='bg-dimWhite h-full w-full'>{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
