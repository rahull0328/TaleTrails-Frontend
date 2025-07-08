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
      onSearchTale(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  return (
    <div className="bg-white drop-shadow sticky top-0 z-10 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* 🔹 Top Row: Logo & Profile (mobile: stacked) */}
        <div className="w-full flex items-center justify-between sm:justify-start sm:gap-6">
          <img src="logo.png" alt="logo" className="h-9" />
          {/* Mobile: profile next to logo; Desktop: shifted right via justify-between above */}
          <div className="sm:hidden">
            {isToken && <ProfileInfo userInfo={userInfo} logout={logout} />}
          </div>
        </div>

        {/* 🔹 SearchBar + Profile (desktop view only) */}
        {isToken && (
          <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
            {/* Desktop-only ProfileInfo */}
            <div className="hidden sm:block">
              <ProfileInfo userInfo={userInfo} logout={logout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
