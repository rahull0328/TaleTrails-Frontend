import moment from "moment/moment";
import React from "react";
import { FaHeart } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

const TaleCard = ({
  title,
  date,
  tale,
  image,
  visitedLocation,
  isFavourite,
  onFavouriteClick,
  onClick,
}) => {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:shadow-lg hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer">
      {image && (
        <img
          src={image}
          alt="Tale Banner"
          className="w-full h-56 object-cover rounded-lg"
        />
      )}

      <button
        className="w-12 h-12 flex items-center justify-center bg-white/30 rounded-lg border border-white/30 absolute top-4 right-4"
        onClick={onFavouriteClick}
      >
        <FaHeart
          className={`text-[22px] cursor-pointer transition-colors duration-200 ${
            isFavourite ? "text-red-500" : "text-slate-300 hover:text-red-500"
          }`}
        />
      </button>

      <div className="p-4" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">
              {date ? moment(date).format("Do MMM YYYY") : "-"}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-2">{tale?.slice(0, 60)}</p>

        <div className="inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-1">
          <GrMapLocation className="text-sm" />
          {visitedLocation.map((item, index) =>
            visitedLocation.length == index + 1 ? `${item}` : `${item}, `
          )}
        </div>
      </div>
    </div>
  );
};

export default TaleCard;
