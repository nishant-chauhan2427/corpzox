import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../buttons";

export const NoData = ({className}) => {
  return (
    <>
      <div className={`${className ||" h-[75vh]"} flex flex-col gap-4 text-center justify-center items-center`}>
        <img
          src="/images/errors/no-data.svg"
          width={350}
          alt=""
        />
        <p className="font-medium  text-lg  text-[#595959]">
          No data available.{" "}
        </p>
        {/* <div className="flex flex-col w-full sm:w-[30%]"> */}
        <Link to={"/"} className="flex flex-co`l w-full sm:w-[30%]">
         
        </Link>
        {/* </div> */}
      </div>
    </>
  );
};
