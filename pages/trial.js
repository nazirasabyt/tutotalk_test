// import React from "react";
// import { Button, Form, Input, Select, message, DatePicker, Radio } from "antd";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import { useIntl } from "react-intl";
// import dayjs from "dayjs";

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };

// const Trial = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [availableDate, setAvailableDate] = useState([]);

//   const [formData, setFormData] = useState({
//     student: "",
//     email: "",
//     whatsapp: "",
//     date: "",
//     time: "",
//   });
//   const intl = useIntl();

//   const bookingName = intl.formatMessage({ id: "booking.name" });
//   const bookingEmail = intl.formatMessage({ id: "booking.email" });
//   const bookingDate = intl.formatMessage({ id: "booking.date" });
//   const bookingTime = intl.formatMessage({ id: "booking.time" });
//   const nameMes = intl.formatMessage({ id: "name.mes" });
//   const emailMes = intl.formatMessage({ id: "email.mes" });
//   const dateMes = intl.formatMessage({ id: "date.mes" });
//   const emailMesReq = intl.formatMessage({ id: "email.req.mes" });
//   const whatsappReq = intl.formatMessage({ id: "whatsappReq" });
//   const whatsappInc = intl.formatMessage({ id: "whatsappInc" });
//   const timeMes = intl.formatMessage({ id: "time.mes" });
//   const placeholder = intl.formatMessage({ id: "time.placeholder" });
//   const button = intl.formatMessage({ id: "bookNow" });
//   const bookedTitle = intl.formatMessage({ id: "booked.title" });
//   const bookTitle = intl.formatMessage({ id: "book.title" });
//   const bookedMes = intl.formatMessage({ id: "booked.mes" });
//   const noLesson = intl.formatMessage({ id: "noLesson" });
//   const wrongMes = intl.formatMessage({ id: "wrongMes" });
//   const bookingSuccess = intl.formatMessage({ id: "bookingSuccess" });

//   const loadAvailableDates = async () => {
//     try {
//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/available-trial-dates`
//       );

//       const res = data.data.map((item) => {
//         return {
//           date: item.attributes.date,
//           title: item.attributes.title,
//           time: item.attributes.time,
//           id: item.id,
//         };
//       });

//       const selectedDate = dayjs(formData.date).format("YYYY-MM-DD");
//       const filteredDataDates = res.filter(
//         (lesson) => lesson.date === selectedDate
//       );

//       if (filteredDataDates.length !== 0) {
//         setAvailableDate(filteredDataDates);
//       }
//     } catch (error) {
//       console.log(error);
//       message.error(wrongMes);
//     }
//   };

//   useEffect(() => {
//     loadAvailableDates();
//   }, [formData.date]);

//   const onFinish = async () => {
//     setLoading(true);

//     try {
//       let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/trial-schedules`;

//       const res = await axios({
//         url,
//         method: "post",
//         data: {
//           data: {
//             student: formData.student,
//             email: formData.email,
//             whatsapp: formData.whatsapp,
//             date: dayjs(formData.date).format("YYYY-MM-DD"),
//             time: formData.time,
//           },
//         },
//       });

//       if (res.status === 200) {
//         deleteAvailableTime();
//         fetch("/api/send-email", {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });
//         fetch("/api/notify-teacher", {
//           method: "POST",
//           body: JSON.stringify(formData),
//         });

//         message.success(bookingSuccess);
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//       message.error(wrongMes);
//     }

//     setLoading(false);
//   };

//   const deleteAvailableTime = async () => {
//     const bookedTime = availableDate.filter(
//       (item) => item.time === formData.time
//     );

//     try {
//       let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/available-trial-dates`;

//       await axios({
//         url: `${url}/${bookedTime[0].id}`,
//         method: "DELETE",
//       });
//     } catch (err) {
//       console.log(err, "on delete");
//       message.error(wrongMes);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("onfinished", errorInfo);
//     message.error(wrongMes, errorInfo);
//   };

//   const disabledDateTrial = (current) => {
//     return current.day() !== 0 || current.valueOf() < Date.now();
//   };

//   return (
//     <div className='w-[80%] sm:w-[40%] mx-auto mt-10'>
//       <h1 className='text-xl sm:text-2xl my-4 pb-5 text-gradient'>
//         {loading ? bookedTitle : bookTitle}
//       </h1>{" "}
//       <Form
//         {...formItemLayout}
//         onFinishFailed={onFinishFailed}
//         onFinish={onFinish}
//         style={{
//           maxWidth: 600,
//           color: "#134462",
//         }}
//         scrollToFirstError>
//         <Form.Item
//           name='student'
//           label={bookingName}
//           rules={[
//             {
//               required: true,
//               message: nameMes,
//             },
//           ]}>
//           <Input
//             onChange={(e) =>
//               setFormData({ ...formData, student: e.target.value })
//             }
//             style={{
//               width: "100%",
//             }}
//           />
//         </Form.Item>
//         {/* <Form.Item
//           name='email'
//           label={bookingEmail}
//           rules={[
//             {
//               type: "email",
//               message: emailMes,
//             },
//             {
//               required: true,
//               message: emailMesReq,
//             },
//           ]}>
//           <Input
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//         </Form.Item> */}
//         <Form.Item
//           name='whatsapp'
//           label='WhatsApp'
//           rules={[
//             {
//               type: "text",
//               message: whatsappInc,
//             },
//             {
//               required: true,
//               message: whatsappReq,
//             },
//           ]}>
//           <Input
//             onChange={(e) =>
//               setFormData({ ...formData, whatsapp: e.target.value })
//             }
//             placeholder='+996581355271'
//           />
//         </Form.Item>

//         <Form.Item
//           label={bookingDate}
//           rules={[
//             {
//               required: true,
//               message: dateMes,
//             },
//           ]}>
//           <DatePicker
//             format='YYYY-MM-DD'
//             disabledDate={disabledDateTrial}
//             onChange={(e) => {
//               console.log(e, "date");
//               return setFormData({
//                 ...formData,
//                 date: e,
//               });
//             }}
//           />
//         </Form.Item>

//         <Form.Item
//           name='time'
//           label={bookingTime}
//           rules={[
//             {
//               required: true,
//               message: timeMes,
//             },
//           ]}>
//           <Select
//             placeholder={placeholder}
//             onChange={(e) => setFormData({ ...formData, time: e })}>
//             {availableDate.length !== 0 ? (
//               availableDate.map((item, index) => (
//                 <Select.Option key={index} value={item.time}>
//                   {item.time.slice(0, 5)}
//                 </Select.Option>
//               ))
//             ) : (
//               <Select.Option value={noLesson}>{noLesson}</Select.Option>
//             )}
//           </Select>
//         </Form.Item>
//         <Form.Item {...tailFormItemLayout}>
//           <Button htmlType='submit'>{button}</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Trial;

// fetch("/api/send-email", {
//   method: "POST",
//   body: JSON.stringify(formData),
// });
// fetch("/api/notify-teacher", {
//   method: "POST",
//   body: JSON.stringify(formData),
// });

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

const Trial = () => {
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
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/trial-schedules`,
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
      url: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/trial-schedules`,
      method: "Get",
      headers,
      params: {
        // populate: "users_permissions_user",
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
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/trial-schedules`;
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
      let url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/trial-schedules`;
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

export default Trial;
