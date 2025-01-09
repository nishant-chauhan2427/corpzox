import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../../../../components/heading";
import { useSelector } from "react-redux";
import { LinkButton } from "../../../../../components/link";
import { ServiceCard } from "../serviceCard";

export const ServicesProgress = ({ data }) => {
  const { dataUpdate } = useSelector((state) => state.user);
  const { business } =
    useSelector((state) => state.businessList);

  const navigate = useNavigate();



  return (
    <>
      <div className="flex flex-col gap-4">
        {dataUpdate?.data?.length > 0 ? (
          <>
            <div className="py-2 flex flex-row sm:flex-row justify-between gap-2">
              <Heading
                title={"Dashboard"}
                className={"py-0 "}
                tourButton={true}
              >
                Your Service Progress Updates{" "}
                {dataUpdate?.total ? `(${dataUpdate?.total})` : ""}
              </Heading>
              {dataUpdate?.data?.length > 2 && (
                <Link
                  to={"/services/serviceprogressdetail"}
                  className="font-medium text-sm text-[#797979]"
                >
                  View All
                </Link>
              )}
            </div>

            <ServiceCard data={dataUpdate?.data?.slice(0, 3)} />
          </>
        ) : (
          <div>
            <Heading className={"py-0 "} tourButton={true}>
              Your Service Progress Updates
            </Heading>
            <div className="flex justify-center gap-2 items-center flex-col h-[40vh]">
              <img src="/images/service-prgress.svg" alt="" />
              <p className="font-bold text-xl text-[#000000]">
                No Services Availed
              </p>

              {business?.length > 0 && (
                <LinkButton
                  className={"px-4 py-1"}
                  onClick={() => {
                    navigate("/services");
                  }}
                  primary={true}
                // leftIcon={<IoMdAddCircle />}
                >
                  Avail Service
                </LinkButton>
              )}

            </div>
          </div>
        )}
      </div>

    </>
  );
};

