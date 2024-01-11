import { Tab } from "@headlessui/react";
import Home from "@/components/TeacherComponents/Home";
import BookedLessons from "@/components/TeacherComponents/BookedLessons";
import MyStudents from "@/components/TeacherComponents/MyStudents";
import Groups from "@/components/TeacherComponents/Groups";

const links = [
  {
    id: "/home",
    name: "Home",
    panel: <Home />,
  },
  {
    id: "/mylessons",
    name: "Booked lessons",
    panel: <BookedLessons />,
  },
  {
    id: "/mystudents",
    name: "My Students",
    panel: <MyStudents />,
  },
  {
    id: "/groups",
    name: "Groups",
    panel: <Groups />,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TecahersPage = () => {
  return (
    <div className='w-full bg-dimWhite h-screen'>
      <div className='flex gap-4 w-full mx-auto md:w-[1200px] py-8 text-lg'>
        <Tab.Group>
          <Tab.List className='flex flex-col gap-4 justify-start items-start w-[300px]  h-screen p-4'>
            {links.map((item) => (
              <Tab
                key={item.id}
                className={({ selected }) =>
                  classNames("", selected ? "text-accent" : "text-black")
                }>
                {item.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className='p-4 bg-white w-full rounded-xl'>
            {" "}
            {links.map((item) => (
              <Tab.Panel key={item.id} className={classNames("", "")}>
                {item.panel}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TecahersPage;
