import TaleCard from "@/components/cards/TaleCard";
import Navbar from "@/components/shared/Navbar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

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

  //getting all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/tale/getAllTales");
      if (response.data && response.data.user) {
        setAllStories(response.data.user);
      }
    } catch (error) {
      console.error("Unexpected Error Occured");
    }
  };

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();

    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item) => {
                  return <TaleCard key={item._id} />;
                })}
              </div>
            ) : (
              <>Empty Card Here</>
            )}
          </div>
          <div className="w-[320px]"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
