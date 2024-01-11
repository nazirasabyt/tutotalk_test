import { useSocketContext } from "../../context/socket-context";
import VideoCall from "./VideoCall";
import { useEffect } from "react";

const StudentVideoSession = ({ roomId, isTeacher, userName }) => {
  const { setMyId, setRoomId, setName } = useSocketContext();

  useEffect(() => {
    const getId = async () => {
      const response = await fetch(
        `https://server-test-xb6v.onrender.com/get-id`
      );
      const data = await response.json();
      await setMyId(data.id);
    };

    getId();
    setName(userName);
    setRoomId(roomId);
  }, []);
  return (
    <div className=' h-full flex flex-col'>
      <VideoCall roomId={roomId} />
    </div>
  );
};

export default StudentVideoSession;
