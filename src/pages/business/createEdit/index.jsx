import { useEffect } from "react";
import BusinessListing from "../listing";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { RegistraionDetails } from "./components/registration";
import { AddressDetails } from "./components/address";
import { FinancialDetails } from "./components/financial";
import { KYCDetails } from "./components/kyc";
import { FundingDetails } from "./components/funding";
import { createBusiness } from "../../../redux/slices/businessSlice";

const CreateBusiness = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    // resolver: yupResolver(),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log(data, "data before transfomation");
    dispatch(createBusiness(data))
  };

  return (
    <div>
      {/* <BusinessListing /> */}
      {/* <div className="fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm w-full h-screen flex justify-center items-center z-[1001]">
        <div className="relative bg-white bg-opacity-60 backdrop-blur-lg p-6 rounded-3xl"> */}
      <h3 className="mt-4 font-bold text-2xl text-center">Add Business Details</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 flex flex-col gap-4"
      >
        <RegistraionDetails
          setValue={setValue}
          control={control}
          errors={errors}
          isEdit={isEdit}
        />
        <AddressDetails
          setValue={setValue}
          control={control}
          errors={errors}
          isEdit={isEdit}
        />
        <FinancialDetails
          setValue={setValue}
          control={control}
          errors={errors}
          isEdit={isEdit}
        />
        <KYCDetails
          setValue={setValue}
          control={control}
          errors={errors}
          isEdit={isEdit}
        />
        <FundingDetails
          setValue={setValue}
          control={control}
          errors={errors}
          isEdit={isEdit}
        />
        <div className="flex justify-end items-center gap-4">
          {/* <Button onClick={() => navigate(-1)} outLine={true}>
                Cancel
              </Button> */}
          <Button type={"submit"} primary={true} disabled={!isValid}>
            Save & Next
          </Button>
        </div>
      </form>
      {/* </div>
      </div> */}
    </div>
  );
};

export default CreateBusiness;
