import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../../components/wrappers/modal";
import BusinessListing from "../listing";
import { Button } from "../../../components/buttons";
import { useNavigate } from "react-router-dom";
import { createBusiness } from "../../../redux/slices/businessSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";

const BusinessPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business);

  const [confirmationModal, setConfirmationModal] = useState(false);

  console.log(business, "business");

  // Handle step navigation
  const handleNextStep = () => {
    dispatch(createBusiness());
    navigate("/business");
    toast.success("Business created succesfully!");
  };

  const handlePrevStep = () => {
    navigate("/business/create");
  };
  const onConfirmationModalClose = () => {
    setConfirmationModal(!confirmationModal);
  };

  return (
    <>
      <div>
        <BusinessListing />
        <ModalWrapper title="Preview Business">
          <div className="px-4 my-2 flex flex-col gap-4">
            <div className="p-4 h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Type */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Type
                  </h3>
                  <p className="text-gray-600">
                    {business?.businessType || "N/A"}
                  </p>
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Name
                  </h3>
                  <p className="text-gray-600">
                    {business?.businessName || "N/A"}
                  </p>
                </div>

                {/* CIN Number */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    CIN Number
                  </h3>
                  <p className="text-gray-600">{business?.cinNo || "N/A"}</p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">Role</h3>
                  <p className="text-gray-600">{business?.role || "N/A"}</p>
                </div>

                {/* Year of Establishment */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Year of Establishment
                  </h3>
                  <p className="text-gray-600">
                    {business?.yearOfEstablishment || "N/A"}
                  </p>
                </div>

                {/* Headquarters Location */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Headquarter Location
                  </h3>
                  <p className="text-gray-600">
                    {business?.headquarterLocation || "N/A"}
                  </p>
                </div>

                {/* Business Address */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Address
                  </h3>
                  <p className="text-gray-600">
                    {business?.businessAddress?.line1},{" "}
                    {business?.businessAddress?.city},{" "}
                    {business?.businessAddress?.state} -{" "}
                    {business?.businessAddress?.pinCode || "N/A"}
                  </p>
                </div>

                {/* Communication Address */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Communication Address
                  </h3>
                  <p className="text-gray-600">
                    {business?.communicationAddress?.line1},{" "}
                    {business?.communicationAddress?.city},{" "}
                    {business?.communicationAddress?.state} -{" "}
                    {business?.communicationAddress?.pinCode || "N/A"}
                  </p>
                </div>

                {/* Financial Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Financial Details
                  </h3>
                  <p className="text-gray-600">
                    Capital: {business?.financialDetails?.capital || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Revenue: {business?.financialDetails?.revenue || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Profit: {business?.financialDetails?.profit || "N/A"}
                  </p>
                </div>

                {/* KYC Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    KYC Details
                  </h3>
                  <p className="text-gray-600">
                    Username: {business?.kycDetails?.username || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    ID Proof No: {business?.kycDetails?.idProofNo || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Address Proof No:{" "}
                    {business?.kycDetails?.addressProofNo || "N/A"}
                  </p>
                </div>

                {/* Funding Requirement */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Funding Requirement
                  </h3>
                  <p className="text-gray-600">
                    Funding Required:{" "}
                    {business?.fundingRequirement?.fundingRequired || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Existing Business:{" "}
                    {business?.fundingRequirement?.existingBusiness
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center gap-4">
              <Button type="button" outline={true} onClick={handlePrevStep}>
                Previous
              </Button>

              <Button
                onClick={() => {
                  setConfirmationModal(true);
                  setSignedInMenuPopup(!signedInMenuPopup);
                  handleNextStep(); // Assuming this is the function to be triggered
                }}
                type="button"
                primary={true} // Assuming this is a valid prop
              >
                Submit
              </Button>
            </div>
          </div>
        </ModalWrapper>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col text-center justify-center items-center gap-2 sm:px-10  sm:py-8">
          <img src="/images/payment/payment-done.svg" width={120} alt="" />
          <h5 className="font-bold  text-3xl text-[#232323]">Congratulation</h5>
          <p className="text-base text-[#595959] font-medium">
Your business has been created succesfully          </p>
          <div className="flex flex-col w-full">
            <Button primary={true}>Continue</Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default BusinessPreview;
