import React, { useState } from "react";
import Pagination from "../Pagination";

// Table component
export const Table = ({ data, columns, isExpandable = true, actionMenu }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  console.log(data);

  // Function to handle row expansion
  const toggleRow = (rowIndex) => {
    if (isExpandable) {
      setExpandedRow((prevIndex) => (prevIndex === rowIndex ? null : rowIndex));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse bg-white shadow-md">
        <thead className="bg-[#9DE5D2]">
          <tr>
            {columns?.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <React.Fragment key={index}>
              {/* Main Row */}
              <tr
                className={` hover:bg-gray-50 ${
                  expandedRow === index ? "bg-gray-200 cursor-pointer" : ""
                } border-b`}
                onClick={() => toggleRow(index)}
              >
                {Object.entries(row).map(([key, cell], cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`${(key == "id" || key =="_id") && "hidden"} py-4 px-1 whitespace-nowrap text-xs capitalize`}
                  >
                    {key == "id" || key == "_id" ? (
                      <></>
                    ) : (
                      <span
                        className={`${
                          cell === "Active" || cell === "In progress"
                            ? "bg-green-200 text-green-700"
                            : cell === "Reject" ||
                              cell === "Under Notice" ||
                              cell === "Occupied"
                            ? "bg-orange-200 text-orange-700"
                            : cell === "Pending" ||
                              cell === "Under-Review" ||
                              cell === "Inactive" ||
                              cell === "Not leased"
                            ? "bg-yellow-200 text-yellow-700"
                            : cell === "Expired"
                            ? "bg-gray-200 text-gray-700"
                            : cell === "Modification-Required"
                            ? " bg-pink-200 text-pink-700"
                            : cell === "Vacant"
                            ? " bg-green-200 text-green-700"
                            : cell === "CAPTURED"
                            ? " bg-green-200 text-green-700"
                            : cell === "Started"
                            ? " bg-yellow-200 text-yellow-700"
                            : cell === "Rejected"
                            ? " bg-red-200 text-red-700"
                            : cell === "Resubmitted"
                            ? " bg-purple-200 text-purple-700"
                            : " dark:text-white "
                        } px-3 py-1 rounded-full`}
                      >
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
                {actionMenu && <ActionComponent id={row.id.serviceId} actionMenu={(id) => actionMenu(id)} />}
              </tr>
              {/* Expanded Row (only when expandable is true and row is expanded) */}
              {expandedRow === index && isExpandable && (
                <tr className="border border-[#DBDBDB] rounded-lg">
                  <td className="p-1 text-sm text-gray-600">
                    <div className="p-4">
                      <p className="text-xs">Plan Details</p>
                      <div className="mt-2 rounded text-sm font-mono flex items-center gap-2">
                        <p>{row.plan + " Plan,"}</p>
                        <p>{row.plan + " Plan,"}</p>
                        <p>{row.plan + " Plan"}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};



const ActionComponent = ({ id, actionMenu }) => {
  console.log(id, "sdfsfd");
  
  return actionMenu(id);
};