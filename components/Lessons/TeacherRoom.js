import React, { useContext, useEffect } from "react";
import { SocketContext } from "@/context/socket-context";
import VideoPlayer from "./VideoPlayer";
import UseAuthContext from "@/hooks/useAuthContext";
import { GiExitDoor } from "react-icons/gi";
import {
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillMicFill,
  BsFillMicMuteFill,
} from "react-icons/bs";

const TeacherRoom = ({ data }) => {
  const { auth } = UseAuthContext();

  return <div className='bg-yellow-500'>teacher</div>;
};

export default TeacherRoom;
