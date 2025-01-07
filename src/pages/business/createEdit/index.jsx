import { ModalWrapper } from "../../../components/wrappers/modal";
import { Outlet, replace, useNavigate } from "react-router-dom";
import BusinessListing from "../listing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoaderOff } from "../../../redux/slices/businessSlice";
const CreateBusiness = ({ isEdit=false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("Create Business");
  useEffect(() => {
    // navigate("/business/edit/registration",{replace:true});
    dispatch(setLoaderOff());
    
  },[])

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  
  return (
    <div>
      <BusinessListing />
      <ModalWrapper title={isEdit?"Edit Business Details":"Add Business Details"}>
        <div
          // onSubmit={handleSubmit(onSubmit)}
          className="px-4 my-2  flex flex-col gap-4"
        >
          {/* Progress bar */}
          {/* <div className="w-full h-2 bg-gray-200 mb-4 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{
                // width: `${(currentStep / (steps.length - 1)) * 100}%`,
                width: `20%`,
              }}
            ></div>
          </div> */}

          {/* Step Components */}
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <Outlet />
            {/* {steps[currentStep]?.component} */}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default CreateBusiness;
