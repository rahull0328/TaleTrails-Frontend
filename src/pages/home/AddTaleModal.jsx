import React from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const AddTaleModal = ({ taleInfo, type, onClose, getAllTales }) => {
  const handleAddOrUpdateClick = () => {};
  return (
    <div>
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Tale" : "Update Tale"}
        </h5>

        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={() => {}}>
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
                placeholder="A Day at the Great Wal"
            />

            <div className="my-3">
                <DateSelector />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaleModal;
