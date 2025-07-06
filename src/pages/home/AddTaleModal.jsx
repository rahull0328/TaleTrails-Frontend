import DateSelector from "@/components/input/DateSelector";
import ImageSelector from "@/components/input/ImageSelector";
import TagInput from "@/components/input/TagInput";
import React, { use, useState } from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const AddTaleModal = ({ taleInfo, type, onClose, getAllTales }) => {

  const [title, setTitle] = useState("")
  const [taleImg, setTaleImg] = useState(null)
  const [tale, setTale] = useState("")
  const [visitedLocation, setVisitedLocation] = useState([])
  const [visitedDate, setVisitedDate] = useState(null)

  const handleAddOrUpdateClick = () => {
    console.log("Input Data: ", {title, taleImg, tale, visitedLocation, visitedDate});
  };

  const handleDeleteTaleImg = async () => {

  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Tale" : "Update Tale"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> Add Tale
              </button>
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
                onChange={({target}) => setTitle(target.value) }
            />

            <div className="my-3">
                <DateSelector date={visitedDate} setDate={setVisitedDate} />
            </div>

            <div>
              <ImageSelector image={taleImg} setImage={setTaleImg} handleDeleteImg={handleDeleteTaleImg} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="input-label">Add Your Tale</label>
              <textarea 
                type="text"
                className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
                rows={10}
                value={tale}
                onChange={({target}) => setTale(target.value)}
              >
              </textarea>
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
