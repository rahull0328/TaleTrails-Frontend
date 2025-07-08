import TaleCard from "@/components/cards/TaleCard";
import Navbar from "@/components/shared/Navbar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import ReactModal from "react-modal";
import AddTaleModal from "./AddTaleModal";
import ViewTale from "./ViewTale";
import EmptyCard from "@/components/cards/EmptyCard";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "@/components/cards/FilterInfoTitle";
import { getEmptyCardImg, getEmptyCardMessage } from "@/utils/helper";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/getUserInfo");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllTales = async () => {
    try {
      const response = await axiosInstance.get("/tale/getAllTales");
      if (response.data?.tales) {
        setAllStories(response.data.tales);
      }
    } catch (error) {
      console.error("Unexpected Error Occurred");
    }
  };

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data });
  };

  const deleteTale = async (data) => {
    try {
      const response = await axiosInstance.delete(`/tale/deleteTale/${data._id}`);
      if (response.data && !response.data.error) {
        toast.error("Tale Deleted!");
        setOpenViewModal((prev) => ({ ...prev, isShown: false }));
        getAllTales();
      }
    } catch {
      toast.error("Error Deleting Tale");
    }
  };

  const handleViewTale = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  const updateIsFavourite = async (taleData) => {
    try {
      const response = await axiosInstance.put(
        `/tale/addToFavourites/${taleData._id}`,
        { isFavourite: !taleData.isFavourite }
      );

      if (response.data?.message) {
        toast(!taleData.isFavourite ? "Added to favourites!" : "Removed from favourites!");

        if (filterType === "search" && searchQuery) onSearchTale(searchQuery);
        else if (filterType === "date") filterTaleByDate(dateRange);
        else getAllTales();
      }
    } catch {
      toast.error("Error Adding Tale to Favourites");
    }
  };

  const onSearchTale = async (query) => {
    try {
      const response = await axiosInstance.get("/tale/searchTale", {
        params: { query },
      });

      if (response.data?.searchResult) {
        setFilterType("search");
        setAllStories(response.data.searchResult);
      }
    } catch {
      console.log("Unexpected Error Occurred. Please try again");
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAllTales();
  };

  const filterTaleByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/tale/filterTale", {
          params: { startDate, endDate },
        });

        if (response.data?.filteredTales) {
          setFilterType("date");
          setAllStories(response.data.filteredTales);
        }
      }
    } catch {
      console.log("Unexpected Error Occurred. Please try again");
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterTaleByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllTales();
  };

  useEffect(() => {
    getUserInfo();
    getAllTales();
  }, []);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchTale={onSearchTale}
        handleClearSearch={handleClearSearch}
      />

      <FilterInfoTitle
        filterType={filterType}
        filterDates={dateRange}
        onClear={resetFilter}
      />

      {/* Tale Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-7 flex-wrap">
          {/* Tale Card List */}
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {allStories.map((item) => (
                  <TaleCard
                    key={item._id}
                    title={item.title}
                    tale={item.tale}
                    image={item.image}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavourite={item.isFavourite}
                    onEdit={() => handleEdit(item)}
                    onClick={() => handleViewTale(item)}
                    onFavouriteClick={() => updateIsFavourite(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard
                imgSrc={getEmptyCardImg(filterType)}
                message={getEmptyCardMessage(filterType)}
              />
            )}
          </div>

          {/* Desktop Calendar */}
          <div className="hidden lg:block w-[300px] xl:w-[320px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className="p-3">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Calendar */}
        <div className="block lg:hidden mt-6">
          <div className="bg-white border border-slate-200 rounded-lg shadow-md px-4 py-3">
            <h3 className="text-sm font-semibold mb-2">Filter by Date</h3>
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="range"
              selected={dateRange}
              onSelect={handleDayClick}
              pagedNavigation
            />
          </div>
        </div>
      </div>

      {/* Add & Edit Tale Modal */}
      <ReactModal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
        }}
        appElement={document.getElementById("root")}
        className="modal-box scrollbar"
      >
        <AddTaleModal
          type={openAddEditModal.type}
          taleInfo={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllTales={getAllTales}
        />
      </ReactModal>

      {/* View Tale Modal */}
      <ReactModal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)", zIndex: 999 },
        }}
        appElement={document.getElementById("root")}
        className="modal-box scrollbar"
      >
        <ViewTale
          taleInfo={openViewModal.data || null}
          onclose={() =>
            setOpenViewModal((prev) => ({ ...prev, isShown: false }))
          }
          onDeleteClick={() => deleteTale(openViewModal.data)}
          onEditClick={() => {
            setOpenViewModal((prev) => ({ ...prev, isShown: false }));
            handleEdit(openViewModal.data || null);
          }}
        />
      </ReactModal>

      {/* Floating Add Button */}
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-[#05B6D3] hover:bg-cyan-400 fixed right-6 sm:right-10 bottom-6 sm:bottom-10 z-50"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[28px] sm:text-[32px] text-white" />
      </button>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Home;
