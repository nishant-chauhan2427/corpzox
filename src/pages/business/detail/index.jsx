import { useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/buttons/button";
import { Heading } from "../../../components/heading";
import { LinkButton } from "../../../components/link";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { servicesProgress } from "../../../database";
import { getBusiness } from "../../../redux/actions/business-action";
import {
  updateServiveProgress
} from "../../../redux/actions/dashboard-action";
import { resetBusiness } from "../../../redux/slices/businessSlice";
import { calculateAge } from "../../../utils";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import { businessType } from "../createEdit/components/registration";
import { ServiceProgressShimmer } from "../../../components/loader/ServiceProgressShimmer";
const BusinessDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { business, loading, error } = useSelector((state) => state.business);
  const { user,fetching } = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get("id");
  // console.log("BUSINESS ID12", business)
  useEffect(() => {
    if (businessId) {
      // console.log("Dispatching action with businessId:", businessId);
      dispatch(getBusiness({ businessId }));
    } else {
      console.log("No businessId found");
    }
  }, [businessId, dispatch]);
  // console.log(business, "BUSINESSSS");

  const handleEditBusiness = () => {
    navigate("/business/edit/registration");
  };

  useEffect(() => {
    dispatch(updateServiveProgress({ page: 1, businessId: businessId }));
  }, [businessId]);

  
  // console.log("businessType",businessType?.filter((el)=>el.value===business?.registration?.typeOfBusiness)[0]?.label);
  
  

  const businessTableData = [
    {
      label: "Type",
      value: businessType?.filter((el)=>el.value===business?.registration?.typeOfBusiness)[0]?.label || "-------",
    },
    {
      label: "Registered Office",
      value:
        business?.address?.businessAddressL1 &&
        business?.address?.businessAddressCity &&
        business?.address?.businessAddressPin
          ? `${business.address.businessAddressL1}, ${business.address.businessAddressCity}, ${business.address.businessAddressPin}`
          : "-------",
    },
    {
      label: "Headquarter Location",
      value: business?.registration?.headQuarterLocation
        ? business?.registration?.headQuarterLocation
        : "-------",
    },
    {
      label: "Company Status",
      value: business?.registration?.active ? "Active" : "In Active",
    },
    {
      label: "Company Size",
      value: business?.registration?.sizeOfCompany
        ? business?.registration?.sizeOfCompany
        : "-------",
    },
    {
      label: "Company Age",
      value: calculateAge(business?.registration?.yearOfStablish) || "-------",
    },
  ];

  return (
    <>
      {loading ? (
        <div className="py-4">
          <TableShimmer />
        </div>
      ) : (
        <section className="pb-10">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row justify-between gap-4 ">
              <Heading
                title={"Business Detail"}
                backButton={true}
                tourButton={true}
              >
                Business Detail
              </Heading>
              <div className="flex gap-2 items-center">
                {/* <LinkButton className = {"px-4 py-1"} to={"/business/create"} primary={true} leftIcon={<IoMdAddCircle />}>
            New Business
          </LinkButton> */}

                <LinkButton
                  className={"px-4 py-1"}
                  onClick={() => {
                    dispatch(resetBusiness());
                    navigate("/business/create");
                  }}
                  primary={true}
                  leftIcon={<IoMdAddCircle />}
                >
                  New Business
                </LinkButton>

                {/* <Button primary={true} leftIcon={<IoMdAddCircle />}>
                New Business
              </Button> */}
                <Button primary={true} onClick={handleEditBusiness}>
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img
                src="/images/business/business-logo-2.svg"
                width={125}
                alt=""
              />
              <div>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1 items-center">
                    <img
                      src="/icons/business/critical-icon.svg"
                      width={20}
                      alt=""
                    />
                    <p className="font-bold text-xs text-[#FF3B3B]">CRITICAL</p>
                  </div>
                </div>
                <h3 className="font-semibold text-2xl text-[#171717]">
                  {console.log(business, "Business123456")}
                  {business?.registration?.businessName
                    ? business?.registration?.businessName
                    : "..."}
                </h3>
                <p className="font-semibold text-base text-[#343C6A]">
                  Business #{business?.registration?.businessNumber}
                </p>
                {/* <p className="font-semibold text-base text-black">
                  {business?.businessNumber}
                </p> */}
              </div>
            </div>
            <div className="w-full  ">
              <table className="min-w-full table-auto border-collapse bg-white ">
                <tbody>
                  {businessTableData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <span className="pr-6 font-medium text-base text-[#000000B2] whitespace-nowrap">
                          {item.label}:
                        </span>
                      </td>
                      <td>
                        <span className="px-6 font-semibold text-base text-black whitespace-nowrap">
                          {item.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {fetching ? (
          <ServiceProgressShimmer />

        ) : (
          <ServicesProgress
            data={servicesProgress}
          />
        )}
          </div>
        </section>
      )}
    </>
  );
};

export default BusinessDetail;
