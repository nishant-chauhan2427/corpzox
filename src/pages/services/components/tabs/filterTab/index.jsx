import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSubCategory } from "../../../../../redux/slices/serviceListingSlice";
import { useSearchParams } from "react-router-dom";
function Filtertab() {
  const { subCategory } = useSelector((state) => state.service);
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch();
  const [categoryactiveTab, setcategoryActiveTab] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  // useEffect(() => {
  //   const subCategoryIdFromParams = searchParams.get("subCategoryId");
  //   searchParams.delete("subCategory")
  //   if (subCategory?.list?.length > 0) {
  //     if (subCategoryIdFromParams) {
  //       // If subCategoryId exists in params, find and set the subcategory
  //       const foundIndex = subCategory.list.findIndex(
  //         (tab) => tab._id === subCategoryIdFromParams
  //       );
  //       if (foundIndex !== -1) {
  //         setActiveTabIndex(foundIndex);
  //         dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
  //       } else {
  //         // If the subCategoryId in params is invalid, default to the first subcategory
  //         setActiveTabIndex(0);
  //         dispatch(setSelectedSubCategory(subCategory.list[0]));
          
  //         setSearchParams({
  //           categoryId: searchParams.get("categoryId") || "",
  //           subCategoryId: subCategory.list[0]._id,
  //         });
  //       }
  //     } else {
  //       // If no subCategoryId in params, default to the first subcategory
  //       setActiveTabIndex(0);
  //       dispatch(setSelectedSubCategory(subCategory.list[0]));
  //       setSearchParams({
  //         categoryId: searchParams.get("categoryId") || "",
  //         subCategoryId: subCategory.list[0]._id,
  //       });
  //     }
  //   }
  // }, [searchParams, subCategory?.list, dispatch]);
  useEffect(() => {
    // Wait for the subcategory API to complete
    if (!subCategory?.subCategoryLoading && subCategory?.list?.length > 0) {
      const subCategoryIdFromParams = searchParams.get("subCategoryId");
      searchParams.delete("subCategory"); // Remove deprecated key if present
  
      if (subCategoryIdFromParams) {
        // If subCategoryId exists in params, find and set the subcategory
        const foundIndex = subCategory.list.findIndex(
          (tab) => tab._id === subCategoryIdFromParams
        );
        if (foundIndex !== -1) {
          setActiveTabIndex(foundIndex);
          dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
        } else {
          // If the subCategoryId in params is invalid, default to the first subcategory
          setActiveTabIndex(0);
          dispatch(setSelectedSubCategory(subCategory.list[0]));
          // setSearchParams({
          //   categoryId: searchParams.get("categoryId") || "",
          //   subCategoryId: subCategory.list[0]._id,
          // });
        }
      } else {
        // If no subCategoryId in params, default to the first subcategory
        setActiveTabIndex(0);
        dispatch(setSelectedSubCategory(subCategory.list[0]));
        setSearchParams({
          categoryId: searchParams.get("categoryId") || "",
          subCategoryId: subCategory.list[0]._id,
        });
      }
    }
  }, [searchParams, subCategory?.list, subCategory?.subCategoryLoading, dispatch]);

  // useEffect(() => {
  //   // Wait for the subcategory API to finish
  //   if (!subCategory?.subCategoryLoading && subCategory?.list?.length > 0) {
  //     // Clear all existing query parameters
  //     setSearchParams({});
  
  //     // Set the first subcategory in query if data exists
  //     setSearchParams({
  //       categoryId: searchParams.get("categoryId") || "",
  //       subCategoryId: subCategory.list[0]._id,
  //     });
  //   }
  // }, [subCategory?.list, subCategory?.subCategoryLoading, setSearchParams]);
  
  
  
  
  // useEffect(() => {
  //   const subCategoryIdFromParams = searchParams.get("subCategoryId");
  
  //   if (subCategory?.list?.length) {
  //     // If subCategoryId exists in params
  //     if (subCategoryIdFromParams) {
  //       const foundIndex = subCategory.list.findIndex(
  //         (tab) => tab._id === subCategoryIdFromParams
  //       );
  
  //       if (foundIndex !== -1) {
  //         // If the subcategoryId exists and is valid
  //         setActiveTabIndex(foundIndex);
  //         dispatch(setSelectedSubCategory(subCategory.list[foundIndex]));
  //       } else {
  //         // If the subcategoryId in params is invalid, default to the first subcategory
  //         if (subCategoryIdFromParams !== subCategory.list[0]._id) {
  //           setActiveTabIndex(0);
  //           dispatch(setSelectedSubCategory(subCategory.list[0]));
  //           // Update the URL with the default subCategoryId (only if it doesn't match the first one)
  //           setSearchParams({
  //             categoryId: searchParams.get("categoryId") || "",
  //             subCategoryId: subCategory.list[0]._id,
  //           });
  //         }
  //       }
  //     } else {
  //       // If no subCategoryId in params, default to the first subcategory
  //       if (subCategoryIdFromParams !== subCategory.list[0]._id) {
  //         setActiveTabIndex(0);
  //         dispatch(setSelectedSubCategory(subCategory.list[0]));
  //         setSearchParams({
  //           categoryId: searchParams.get("categoryId") || "",
  //           subCategoryId: subCategory.list[0]._id,
  //         });
  //       }
  //     }
  //   }
  // }, [searchParams, subCategory?.list, dispatch]);
  
  const handleTab = (tab) => {
    console.log(tab, "tab")
    dispatch(setSelectedSubCategory(tab))
    setSearchParams({ categoryId: searchParams.get("categoryId") || "", subCategoryId: tab._id })
  }
  return (
    <>
      <div className="flex space-x-5  overflow-x-auto scrollbar-hide whitespace-nowrap pb-4 pt-4 ">
        {subCategory.list.map((tab, index) => (
          <button
            key={index}
            // className={`sm: ${subCategory?.selectedSubCategory.subCategoryId ===
            //     tab.subCategoryId
            //     ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC]  rounded pr-2 "
            //     : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            //   }`}
            className={`${
              activeTabIndex === index
                ? "text-[#0A1C40] text-sm font-bold border-b-4 py-1 border-[#004BBC] rounded pr-2"
                : "font-normal text-sm pr-2 py-1 text-[#7E7E7E]"
            }`}
            onClick={() => (handleTab(tab))}
          >
            {tab.subSectionTitle}
          </button>
        ))}
      </div>
    </>
  );
}

export default Filtertab;
