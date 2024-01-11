import React, { useState, useEffect } from "react";
import UseAuthContext from "@/hooks/useAuthContext";
import { message } from "antd";
import axios from "axios";
import { parseCookies } from "nookies";
import Image from "next/image";

const FormModal = (props) => {
  const { state, dispatch } = UseAuthContext();
  const [selectedFile, setSelectedFile] = useState(null); // Initialize to null
  const [profileState, setProfileState] = useState({
    image: state?.user?.image,
    username: state?.user.username,
    lastName: state?.user.lastName,
    email: state?.user.email,
    phoneNum: state?.user.phoneNum,
    hobby: state?.user.hobby,
    location: state?.user.location,
    level: state?.user.level,
  });

  const cookies = parseCookies();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${state?.user.id}`,
          { headers }
        );

        if (data.image) {
          // Set selectedFile and profileState.image when an image is available
          setSelectedFile(data.image);
        }
        setProfileState((prevState) => ({
          ...prevState,
          data,
        }));

        console.log("Your information loaded successfully");
      } catch (err) {
        console.log("An error occurred while loading user information:", err);
        message.error("An error occurred while loading user information!");
      }
    };
    init();
  }, []);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
        // setProfileState({ ...profileState, image: reader.result });
        setProfileState((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInput = (e) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    // setProfileState({ ...profileState, [name]: value });
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${state?.user.id}`,
        profileState,
        { headers }
      );
      setProfileState((prevState) => ({
        ...prevState,
        data,
      }));

      message.success("Your information updated successfully");
    } catch (err) {
      if (err.response.status == 413) {
        message.error("Image is too large. Max size 5mb");
      }
      console.log("An error occurred while updating user information:", err);
    }
  };

  return (
    <div className='flex flex-col p-4 justify-center items-center relative'>
      {!selectedFile && (
        <div className='w-[100px] h-[100px] py-[25px] bg-gray-200 rounded-full flex justify-center items-center relative'></div>
      )}
      {selectedFile && (
        <div className='w-[100px] h-[100px] py-[25px] bg-gray-200 rounded-full flex justify-center items-center relative'>
          <Image
            src={selectedFile}
            alt='Selected'
            width={100}
            height={100}
            className='rounded-full'
          />
        </div>
      )}
      <input
        type='file'
        id='fileInput'
        accept='image/*'
        style={{ display: "none" }}
        onChange={(e) => handleChange(e)}
      />
      <label
        htmlFor='fileInput'
        className='absolute top-[90px] right-[150px] cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'>
          <path
            d='M16.0833 7.43758L12.5417 3.93758L13.7083 2.77091C14.0278 2.45147 14.4203 2.29175 14.8858 2.29175C15.3514 2.29175 15.7436 2.45147 16.0625 2.77091L17.2292 3.93758C17.5486 4.25703 17.7153 4.64258 17.7292 5.09425C17.7431 5.54591 17.5903 5.93119 17.2708 6.25008L16.0833 7.43758ZM14.875 8.66675L6.04167 17.5001H2.5V13.9584L11.3333 5.12508L14.875 8.66675Z'
            fill='black'
          />
        </svg>
      </label>
      <form
        className='w-full gap-4 mx-auto flex  flex-col justify-center items-center'
        onSubmit={handleSubmit}>
        {/* <div className='flex  mb-6 '>
          <label className='flex flex-col w-full mx-auto '>
            <span>Bio</span>
            <textarea
              className='w-full  h-20 p-2 rounded-lg'
              placeholder='Bio'
              name='bio'
              type='text'
              value={profileState.bio}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div> */}
        <div className='flex'>
          <label className='flex flex-col w-full mx-auto'>
            <span>Name</span>
            <input
              className='inputField'
              placeholder='Name'
              name='name'
              type='text'
              value={profileState.username || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className='flex'>
          <label className='flex flex-col  w-full mx-auto'>
            <span>Email</span>
            <input
              className='inputField'
              placeholder='Email'
              name='email'
              type='email'
              value={profileState.email || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className='flex'>
          <label className='flex flex-col w-full mx-auto'>
            <span>Phone Number</span>
            <input
              className='inputField'
              placeholder='Phone Number'
              name='phoneNum'
              type='text'
              value={profileState.phoneNum || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className='flex'>
          <label className='flex flex-col  w-full mx-auto'>
            <span>Level</span>
            <input
              className='inputField'
              placeholder='Level'
              name='level'
              type='text'
              value={profileState.level || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className='flex'>
          <label className='flex flex-col  w-full mx-auto'>
            <span>Location</span>
            <input
              className='inputField'
              placeholder='location'
              name='location'
              type='text'
              value={profileState.location || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <div className='flex'>
          <label className='flex flex-col  w-full mx-auto'>
            <span>Interests</span>
            <input
              className='inputField'
              placeholder='Interests'
              name='hobby'
              type='text'
              value={profileState.hobby || ""}
              onChange={(e) => handleInput(e)}
            />
          </label>
        </div>
        <button
          type='submit'
          className='bg-[#3F7EA5] p-2 rounded-lg text-white w-[352px] h-[48px] mt-5'>
          Save
        </button>
      </form>
    </div>
  );
};

export default FormModal;
