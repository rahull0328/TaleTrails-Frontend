import Navbar from "@/components/shared/Navbar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  //getting user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/getUserInfo");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();

    return () => {};
  }, []);

  return (
    <div>
      <Navbar />

      {JSON.stringify(userInfo)}
    </div>
  );
};

export default Home;
