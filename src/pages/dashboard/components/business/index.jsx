import { Link } from "react-router-dom";
import { Button } from "../../../../components/buttons";
import { IoMdAddCircle } from "react-icons/io";
import { BusinessCard } from "../../../business/listing/components/businessCard";
import { Heading } from "../../../../components/heading";
import { LinkButton } from "../../../../components/link";

export const Business = ({ data = [], total }) => {
  
  return (
    <div className="flex flex-col ">
      <div className="py-2 flex flex-col sm:flex-row justify-between gap-2">
        <Heading className={"py-0"} title={"Dashboard"} tourButton={true}>
          Your Business ({data.length})
        </Heading>
        <div className="flex items-center gap-2">
          <LinkButton
            primary={true}
            leftIcon={<IoMdAddCircle />}
            to={"/business/create"}
          >
            Add Business
          </LinkButton>
          <Link className="font-medium text-sm text-[#797979]" to={"/business"}>
            View All
          </Link>
        </div>
      </div>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
          {data.slice(0, 2).map((data, index) => (
            <BusinessCard key={index} data={data} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center gap-2 items-center flex-col h-[50vh]">
          <img src="/images/business/no-business.svg" alt="" />
          <p className="font-bold  text-xl text-[#000000] ">
            No Business Created
          </p>
          <p className="font-normal text-[#797979]">
            Create one to start your services
          </p>
          <LinkButton className = {"px-4 py-1"} to={"/business/create"} primary={true} leftIcon={<IoMdAddCircle />}>
            Add Business
          </LinkButton>
        </div>
      )}
    </div>
  );
};
