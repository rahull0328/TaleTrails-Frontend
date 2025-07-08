import moment from "moment";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

const FilterInfoTitle = ({ filterType, filterDates, onClear }) => {
  const DateRangeChip = ({ date }) => {
    const startDate = date?.from
      ? moment(date?.from).format("Do MMM YYYY")
      : "N/A";
    const endDate = date?.to
      ? moment(date?.to).format("Do MMM YYYY")
      : "N/A";

    return (
      <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-md">
        <p className="text-sm font-medium truncate">
          {startDate} - {endDate}
        </p>
        <button onClick={onClear}>
          <MdOutlineClose className="text-base hover:text-red-500" />
        </button>
      </div>
    );
  };

  return (
    filterType && (
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
        {filterType === "search" ? (
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            Search Results
          </h3>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Travel Stories From:
            </h3>
            <DateRangeChip date={filterDates} />
          </div>
        )}
      </div>
    )
  );
};

export default FilterInfoTitle;
