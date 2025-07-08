import React from "react";
import ProfileInfo from "../cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import SearchBar from "../input/SearchBar";

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchTale, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axiosInstance.get("/user/logout");
      if (response.data.success) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchTale(searchQuery)
    }
  };

  const onClearSearch = () => {
    handleClearSearch()
    setSearchQuery("")
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src="logo.png" alt="logo" className="h-9" />

      {isToken && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
            }}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo userInfo={userInfo} logout={logout} />{" "}
        </>
      )}
    </div>
  );
};

export default Navbar;
