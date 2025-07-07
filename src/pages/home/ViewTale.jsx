import React from "react";
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from "react-icons/md";

const ViewTale = ({taleInfo, onclose, onEditClick, onDeleteClick}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
            <button className="btn-small" onClick={onEditClick}>
              <MdUpdate className="text-lg" /> Update Story
            </button>

            <button className="btn-small btn-delete" onClick={onDeleteClick}>
              <MdDeleteOutline className="text-lg" /> Delete
            </button>

            <button className="" onClick={onclose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTale;
