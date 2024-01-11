import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import UseAuthContext from "@/hooks/useAuthContext";
import { parseCookies } from "nookies";
import axios from "axios";
import { Spin, message } from "antd";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const Schedule = ({ view }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const { state } = UseAuthContext();

  const title = intl.formatMessage({ id: "schedule.h1" });
  const p = intl.formatMessage({ id: "schedule.today" });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchSchedule = async () => {
    const cookies = parseCookies();

    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.jwt}`,
    };

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=schedule_group`,
        { headers }
      );

      if (data && data.schedule_group) {
        // const data = res.data.schedule_group.map((event) => ({
        //   ...event,
        //   title: event.title,
        //   // time: dayjs(event.time, 'HH:mm:ss'),
        //   start: new Date(event.startDate),
        //   end: new Date(event.endDate),
        // }));
        const lesson = {
          title: data.schedule_group.title,
          start: new Date(data.schedule_group.startDate),
          end: new Date(data.schedule_group.endDate),
        };

        const array = [lesson];
        // Duplicate the lesson 2 more times within 7 days
        for (let i = 1; i <= 2; i++) {
          const newStart = new Date(lesson.start);
          newStart.setDate(newStart.getDate() + i * 2); // Adjust the day interval as needed

          const newEnd = new Date(lesson.end);
          newEnd.setDate(newEnd.getDate() + i * 2); // Adjust the day interval as needed

          array.push({ ...lesson, start: newStart, end: newEnd });
        }
        setAllEvents(array);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className='dashboard_card h-full md:h-[700px] bg-white pb-8'>
      <div className='flex flex-col gap-1'>
        <div className='bg-white rounded-t-3xl text-black py-[25px] px-[30px]'>
          <h4 className='font-semibold text-xl'>{title}</h4>{" "}
          <p className='text-sm'>
            {p} {today}
          </p>
        </div>

        {loading && <Spin />}
        <div className='w-[95%] mx-auto  h-[600px] px-4 bg-white rounded-xl items-start self-start'>
          {" "}
          <Calendar
            events={allEvents}
            localizer={localizer}
            // views={["week", "agenda"]}
            defaultView={view}
            startAccessor='start'
            endAccessor='end'
            toolbar={false}
            min={new Date().setHours(8, 0, 0)}
            max={new Date().setHours(23, 0, 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
