import { Button } from "../../../components/buttons/button";
import { IoIosArrowRoundBack, IoMdAddCircle } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ServicesProgress } from "../../dashboard/components/services/progress";
import { servicesProgress } from "../../../database";
import { useEffect } from "react";
import { getBusiness } from "../../../redux/actions/business-action";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../../../components/heading";
import { BusinessCardShimmer } from "../../../components/loader/BusinessCardShimmer";
import { getUser } from "../../../redux/actions/dashboard-action";
import { LinkButton } from "../../../components/link";
import { resetBusiness } from "../../../redux/slices/businessSlice";
const BusinessDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { business, loading, error } = useSelector((state) => state.business);
  const { user } = useSelector((state) => state.user);
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get("id");
  console.log("BUSINESS ID12", business)
  useEffect(() => {
    if (businessId) {
      console.log("Dispatching action with businessId:", businessId);
      dispatch(getBusiness({ businessId }));

    } else {
      console.log("No businessId found");
    }
  }, [businessId, dispatch]);
  console.log(business, "BUSINESSSS");


  function calculateAge(dateOfEstablishment) {

    const establishedDate = new Date(dateOfEstablishment);

    const currentDate = new Date();

    let years = currentDate.getFullYear() - establishedDate.getFullYear();

    const monthDifference = currentDate.getMonth() - establishedDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < establishedDate.getDate())) {
      years--;
    }


    const tempEstablishmentDate = new Date(establishedDate);
    tempEstablishmentDate.setFullYear(currentDate.getFullYear());

    let days = Math.floor((currentDate - tempEstablishmentDate) / (1000 * 60 * 60 * 24));

    if (days < 0) {
      const previousYearEstablishmentDate = new Date(establishedDate);
      previousYearEstablishmentDate.setFullYear(currentDate.getFullYear() - 1);
      days = Math.floor((currentDate - previousYearEstablishmentDate) / (1000 * 60 * 60 * 24));
    }

    return `${years} years ${days} days`;
  }

  const handleEditBusiness = () => {
    navigate("/business/edit")
  }

  return (
    <>
      {loading ? <><BusinessCardShimmer /></> : <section className="pb-10">
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

              <LinkButton className={"px-4 py-1"} onClick={()=>{ dispatch(resetBusiness());navigate("/business/create")}}  primary={true} leftIcon={<IoMdAddCircle />}>
                New Business
              </LinkButton>

              {/* <Button primary={true} leftIcon={<IoMdAddCircle />}>
                New Business
              </Button> */}
              <Button primary={true} onClick={handleEditBusiness}>Edit</Button>
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
                {(business?.registration?.businessName) ? business?.registration?.businessName : "..."}
              </h3>
              <p className="font-semibold text-base text-[#343C6A]">
                Business #{business?.registration?.businessNumber}
              </p>
              {/* <p className="font-semibold text-base text-black">
                  {business?.businessNumber}
                </p> */}

            </div>
          </div>
          <div>
            <div className="flex flex-col text-start gap-1 w-full md:w-[40%]">
              <div className="flex justify-between">
                <p className="font-medium text-base text-[#000000B2] ">Type:</p>
                <p className="font-semibold text-base text-black">{business?.registration?.typeOfBusiness}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-base text-[#000000B2] ">

                </p>
                <p className="font-semibold text-base text-black">
                  {business?.address?.businessAddressL1},{business?.address?.businessAddressCity},{business?.address?.businessAddressPin}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-base text-[#000000B2] ">
                  Company Status:
                </p>
                <p className="font-semibold text-base text-black">
                  {business?.registration?.active ? "Active" : "In Active"}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium text-base text-[#000000B2] ">
                  Company Age:{" "}
                </p>
                <p className="font-semibold text-base text-black">{calculateAge(business?.registration?.yearOfStablish)} </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-[40%]">
            <p className="font-semibold text-lg text-[#171717] ">
              Contact Detail
            </p>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2] ">
                PhoneNo:
              </p>
              <p className="font-semibold text-base text-black">
                {user?.phone}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-base text-[#000000B2]">
                Email Id:
              </p>
              <p className="font-semibold text-base text-black">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Service Progress */}
          <ServicesProgress data={servicesProgress} />
        </div>
      </section>}
    </>
  );
};

export default BusinessDetail;
