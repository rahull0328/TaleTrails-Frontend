import DateSelector from "@/components/input/DateSelector";
import ImageSelector from "@/components/input/ImageSelector";
import TagInput from "@/components/input/TagInput";
import axiosInstance from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { use, useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";
import { toast } from "react-toastify";

const AddTaleModal = ({ taleInfo, type, onClose, getAllTales }) => {

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("");
  const [taleImg, setTaleImg] = useState(null);
  const [tale, setTale] = useState("");
  const [visitedLocation, setVisitedLocation] = useState([]);
  const [visitedDate, setVisitedDate] = useState(null);
  const [error, setError] = useState("");

  const addNewTale = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tale", tale);
    formData.append("visitedLocation", visitedLocation);
    formData.append(
      "visitedDate",
      visitedDate ? moment(visitedDate).valueOf() : moment().valueOf()
    );

    if (taleImg) {
      formData.append("file", taleImg);
    }

    try {
      setLoading(true)
      const response = await axiosInstance.post("/tale/addTale", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        toast("Tale Added !");
        getAllTales();
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false)
    }
  };

  const updateTale = async () => {};

  const handleAddOrUpdateClick = () => {
    console.log("Input Data: ", {
      title,
      taleImg,
      tale,
      visitedLocation,
      visitedDate,
    });

    if (!title) {
      setError("Please Enter Title");
      return;
    }

    if (!tale) {
      setError("Please Enter Tale");
      return;
    }

    if (!taleImg) {
      setError("Please Enter an Image");
      return;
    }

    if (type === "edit") {
      updateTale();
    } else {
      addNewTale();
    }
  };

  const handleDeleteTaleImg = async () => {};
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Tale" : "Update Tale"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (

              loading ? (
                  <button className='btn-small flex items-center gap-2 opacity-70 cursor-not-allowed' disabled>
                    <Loader2 className='h-4 w-4 animate-spin' /> Please Wait
                  </button>
              ) : (
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdAdd className="text-lg" /> Add Tale
                </button>
              )

            ) : (
              <>
                <button className="btn-small" onClick={handleAddOrUpdateClick}>
                  <MdUpdate className="text-lg" /> Update Tale
                </button>
              </>
            )}

            <button className="" onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
          )}
        </div>
      </div>

      <div className="">
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label htmlFor="input-label">Title</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <div>
            <ImageSelector
              image={taleImg}
              setImage={setTaleImg}
              handleDeleteImg={handleDeleteTaleImg}
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Add Your Tale</label>
            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              rows={10}
              value={tale}
              onChange={({ target }) => setTale(target.value)}
            ></textarea>
          </div>

          <div className="pt-3">
            <label className="input-label">Visited Locations</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaleModal;
