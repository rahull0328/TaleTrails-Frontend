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
import diary from "../../assets/diary.png";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import FilterInfoTitle from "@/components/cards/FilterInfoTitle";
import { getEmptyCardMessage } from "@/utils/helper";

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  //search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState('')

  //date picker
  const [dateRange, setDateRange] = useState({from: null, to: null})

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/getUserInfo");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all travel stories
  const getAllTales = async () => {
    try {
      const response = await axiosInstance.get("/tale/getAllTales");
      if (response.data && response.data.tales) {
        setAllStories(response.data.tales);
      }
    } catch (error) {
      console.error("Unexpected Error Occurred");
    }
  };

  // Handle edit story click
  const handleEdit = (data) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: data });
  };

  //delete tale api
  const deleteTale = async (data) => {
    const taleId = data._id;

    try {
      const response = await axiosInstance.delete("/tale/deleteTale/" + taleId);

      if (response.data && !response.data.error) {
        toast.error("Tale Deleted !");
        setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
        getAllTales();
      }
    } catch (error) {
      toast.error("Error Deleting Tale");
    }
  };

  // Handle tale click
  const handleViewTale = (data) => {
    setOpenViewModal({ isShown: true, data });
  };

  // Handle isFavourite click
  const updateIsFavourite = async (taleData) => {
    const taleId = taleData._id;

    try {
      const response = await axiosInstance.put(
        "/tale/addToFavourites/" + taleId,
        {
          isFavourite: !taleData.isFavourite,
        }
      );

      if (response.data && response.data.message) {
        if (!taleData.isFavourite) {
          toast("Added to favourites!");
        } else {
          toast.info("Removed from favourites!");
        }

        if(filterType === 'search' && searchQuery) {
          onSearchTale(searchQuery)
        } else if (filterType === 'date') {
          filterTaleByDate(dateRange)
        } else {
          getAllTales();
        }
      }
    } catch (error) {
      toast.error("Error Adding Tale to Favourites");
    }
  };

  //search tale
  const onSearchTale = async (query) => {
    try {
      const response = await axiosInstance.get('/tale/searchTale', {
        params: {
          query,
        }
      })

      if(response.data && response.data.searchResult) {
        setFilterType("search")
        setAllStories(response.data.searchResult)
      }
    } catch (error) {
      console.log("Unexpected Error Occured. Please try again")
    }
  }

  const handleClearSearch = () => {
    setFilterType("")
    getAllTales()
  }

  //handling tale filter by date
  const filterTaleByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if(startDate && endDate) {
        const response = await axiosInstance.get('/tale/filterTale', {
          params: {startDate, endDate},
        })

        if(response.data && response.data.filteredTales) {
          setFilterType("date")
          setAllStories(response.data.filteredTales)
        }
      }
    } catch (error) {
      console.log("Unexpected Error Occured. Please try again")
    }
  }

  // handling selected date
  const handleDayClick = (day) => {
    setDateRange(day)
    filterTaleByDate(day)
  }

  //reset the applied filters
  const resetFilter = () => {
    setDateRange({from: null, to: null})
    setFilterType("")
    getAllTales()
  }

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
        onClear={()=> {
          resetFilter()
        }}
      />

      {/* Tale Cards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-7">
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
              <>
                <EmptyCard
                  imgSrc={diary}
                  message={getEmptyCardMessage(filterType)}
                />
              </>
            )}
          </div>

          {/* Right Sidebar */}
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
      </div>

      {/* add & edit tales modal */}
      <ReactModal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="modal-box scrollbar"
      >
        <AddTaleModal
          type={openAddEditModal.type}
          taleInfo={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllTales={getAllTales}
        />
      </ReactModal>

      {/* open popup modal for selected tale */}
      <ReactModal
        isOpen={openViewModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="modal-box scrollbar"
      >
        <ViewTale
          taleInfo={openViewModal.data || null}
          onclose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          onDeleteClick={() => deleteTale(openViewModal.data)}
          onEditClick={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
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
