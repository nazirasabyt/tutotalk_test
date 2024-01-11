import React from "react";
import Layout from "@/components/Shared/Layout";
import CalendarPage from "@/components/Schedule/CalendarPage";
import UseAuthContext from "@/hooks/useAuthContext";
import TeachersList from "@/components/Schedule/TeachersList";

const Schedule = () => {
  return (
    <Layout>
      <div className='mx-8 '>
        {/* {state?.user?.payment_type == "individual" ? ( */}
        <CalendarPage />
        {/* <TeachersList /> */}
        {/* ) : ( */}
        {/* // <Calendar /> */}
        {/* <p>NO schedule</p> */}
        {/* )} */}
      </div>
    </Layout>
  );
};

export default Schedule;
