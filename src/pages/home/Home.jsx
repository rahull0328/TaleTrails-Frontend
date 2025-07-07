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

const Home = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  })

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
  const handleEdit = (data) => {};

  // Handle tale click
  const handleViewTale = (data) => {
    setOpenViewModal({isShown: true, data})
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
        getAllTales();
      }
    } catch (error) {
      console.error("Unexpected Error Occurred.");
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllTales();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

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
              <div className="text-slate-500 text-center py-10">
                No tales found.
              </div>
            )}
          </div>

          {/* Right Sidebar (optional) */}
          <div className="hidden lg:block w-[300px] xl:w-[400px]"></div>
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
        onRequestClose={()=> {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }
        }}
        appElement={document.getElementById("root")}
        className="modal-box scrollbar"
      >
        <ViewTale 
          taleInfo = {openViewModal.data || null}
          onclose={()=> {}}
          onDeleteClick={()=> {}}
          onEditClick={()=> {}}
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
