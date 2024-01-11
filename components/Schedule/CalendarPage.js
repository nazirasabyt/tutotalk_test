import { parseCookies } from "nookies";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect, Fragment } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Dialog, Transition } from "@headlessui/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UseAuthContext from "@/hooks/useAuthContext";
import { DatePicker, Input, message } from "antd";
import dayjs from "dayjs";
const localizer = momentLocalizer(moment);

const editItemInit = {
  title: "English",
  // time: "",
  start: "",
  end: "",
  isOpen: false,
  type: "create",
};

const CalendarPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const { state } = UseAuthContext();
  const [editItem, setEditItem] = useState({ ...editItemInit });

  const [selectDayLessonList, setSelectDayLessonList] = useState([]);

  const cookies = parseCookies();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=schedules`,
        { headers }
      );

      // console.log(res, "res");
      if (res.data.schedules) {
        const data = res.data.schedules.map((event) => ({
          ...event,
          title: event.title,
          // time: dayjs(event.time, 'HH:mm:ss'),
          start: new Date(event.startDate),
          end: new Date(event.endDate),
        }));
        setAllEvents(data);
        // console.log(data, "data");
      }

      // addLessons(res.data.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSlotSelected = (info) => {
    // console.log("info", info);
    let startDate = dayjs(info.start);
    let endDate = dayjs(info.end);

    const currentDate = dayjs().format("YYYY-MM-DD");
    const isBeforeToday = startDate.isBefore(currentDate);
    if (isBeforeToday) {
      message.error("Past dates are no longer available for booking");
      return;
    }
    getSelectDayLessonList(startDate);

    let isOneDay = endDate.diff(startDate, "day");

    // console.log(isOneDay, "isOneDay");
    setEditItem({
      title: "",
      // time: "",
      start: dayjs(info.start),
      end: isOneDay ? dayjs(info.start) : dayjs(info.end),
      isOpen: true,
      type: "create",
    });
  };
  const handleEventSelected = (event) => {
    // console.log(event, "event");
    const date = dayjs(event.start);
    getSelectDayLessonList(date);
    setEditItem({
      ...event,
      title: event.title,
      // time: event.time,
      start: dayjs(event.start),
      end: dayjs(event.end),
      isOpen: true,
      type: "edit",
    });
  };
  const getSelectDayLessonList = async (date) => {
    const startDate = new Date(date.format("YYYY-MM-DD"));
    const endDate = new Date(date.format("YYYY-MM-DD"));
    endDate.setHours(23, 59, 59, 999);
    // console.log(date, startDate, endDate, "startDate");
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/schedules`,
      method: "Get",
      headers,
      params: {
        populate: "users_permissions_user",
        filters: {
          startDate: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
    });
    const data = res.data.data.map((item) => {
      return {
        start: item.attributes.startDate,
        end: item.attributes.endDate,
      };
    });
    setSelectDayLessonList(data);
    return data;
  };
  const initEditItem = () => {
    setEditItem({ ...editItemInit });
  };

  const closeModal = () => {
    setEditItem({
      ...editItemInit,
    });
  };
  const editItemConfirm = async () => {
    if (!editItem.title) {
      // console.log("please input the title");
      message.error("please input the title");
      return;
    }
    if (dayjs(editItem.end).isBefore(dayjs(editItem.start))) {
      // console.log("please input the title");
      message.error("The end time must be later than the start time");
      return;
    }

    try {
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/schedules`;
      const res = await axios({
        url: editItem.type === "edit" ? `${url}/${editItem.id}` : url,
        method: editItem.type === "edit" ? "PUT" : "POST",
        data: {
          data: {
            user: {
              connect: [state.user.id],
            },
            title: editItem.title,
            startDate: editItem.start,
            endDate: editItem.end,
          },
        },
        headers,
      });

      if (res.data) {
        await fetchData();
        initEditItem();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const deleteEditItem = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/schedules`;
      const res = await axios({
        url: `${url}/${editItem.id}`,
        method: "DELETE",
        headers,
      });

      // console.log(res, "res");
      if (res.data) {
        await fetchData();
        initEditItem();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const range = (start, end) => {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledTime = (_, type) => {
    let disabledHours = [];
    // console.log(selectDayLessonList, "selectDayLessonList");
    for (let i = 0; i < selectDayLessonList.length; i++) {
      const { start, end } = selectDayLessonList[i];
      const startTime = dayjs(start);
      const endTime = dayjs(end);

      const isUpEnd = endTime.minute();

      disabledHours = [
        ...disabledHours,
        ...range(
          startTime.hour(),
          isUpEnd ? endTime.hour() : endTime.hour() - 1
        ),
      ];
    }

    disabledHours = [...new Set(disabledHours)];
    // console.log(disabledHours, "disabledHours");
    return {
      disabledHours: () => disabledHours,
    };
  };

  const disabledDate = (current) => {
    return current && !dayjs(current).isSame(dayjs(editItem.start), "day");
  };

  return (
    <div>
      <div className='w-[95%] mx-auto  h-[800px] mt-10 bg-white p-5 rounded-xl'>
        <Calendar
          selectable={true}
          events={allEvents}
          localizer={localizer}
          // views={["week", "agenda", "day"]}
          startAccessor='start'
          endAccessor='end'
          onSelectSlot={handleSlotSelected}
          onSelectEvent={handleEventSelected}
          min={new Date().setHours(8, 0, 0)} // Set the minimum time to 8 AM
          max={new Date().setHours(23, 0, 0)} // Set the maximum time to 11 PM
        />

        <Transition appear show={editItem.isOpen} as={Fragment}>
          <Dialog as='div' className='relative z-10' onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'>
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'>
                      {editItem.title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      Lesson:{" "}
                      <Input
                        value={editItem.title}
                        onChange={(e) =>
                          setEditItem({ ...editItem, title: e.target.value })
                        }></Input>
                    </div>

                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        <DatePicker
                          disabledDate={disabledDate}
                          showTime
                          value={editItem.start}
                          onChange={(e) => {
                            console.log(e, "eee");
                            const endDate = e.clone().add(50, "minutes");
                            return setEditItem({
                              ...editItem,
                              start: e,
                              end: endDate,
                            });
                          }}
                          disabledTime={disabledTime}
                        />
                      </p>
                    </div>

                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={closeModal}>
                        Cancel
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={deleteEditItem}>
                        Delete
                      </button>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={editItemConfirm}>
                        Confirm
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default CalendarPage;
