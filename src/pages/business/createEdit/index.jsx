import BusinessListing from "../listing";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { RegistraionDetails } from "./components/registration";
import { Button } from "../../../components/buttons";

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
  };
  return (
    <div>
      <BusinessListing />
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
       
        <div className="flex justify-end items-center gap-4">
          <Button onClick={() => navigate(-1)} outLine={true}>
            Cancel
          </Button>
          <Button type={"submit"} mainPrimary={true} disabled={!isValid}>
            Preview
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBusiness;
