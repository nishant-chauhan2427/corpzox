import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../../components/wrappers/modal";
import BusinessListing from "../listing";
import { Button } from "../../../components/buttons";
import { useNavigate } from "react-router-dom";
import { createBusiness, resetBusiness } from "../../../redux/slices/businessSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { updateAddressDetails, updateFinancialDetails, updateFundingDetails, updateKYCDetails } from "../../../redux/actions/business-action";

const BusinessPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {registration, address, financial, kyc, funding} = useSelector((state) => state.business.business);
  const {businessId} = useSelector(state => state.business);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formModal,setFormModal] = useState(true);

  console.log("DAT",businessId);




  const handleNextStep = async () => {
    if (businessId) {
      try {
        setLoading(true);
        await dispatch(updateAddressDetails({...address?.businessAddress, ...address?.communicationAddress, businessId}));
        await dispatch(updateFinancialDetails({...financial?.financialDetails, businessId}));
        await dispatch(updateKYCDetails({ ...kyc?.kycDetails,businessId }));
        await dispatch(updateFundingDetails({ businessId,...funding?.fundingRequirement}));

        toast.success("Business created successfully!");
        
        setConfirmationModal(true);
        dispatch(resetBusiness());
        setLoading(false);
        setFormModal(false);
      } catch (error) {
        setLoading(false);
        toast.error("An error occurred while submitting business details.");
        console.error(error);
      }
    } else {
      setLoading(false); 
      toast.error("Business ID not found.");
    }
  };

  const handlePrevStep = () => {
    navigate("/business/create");
  };
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };

  return (
    <>
      <div>
        <BusinessListing />
       { formModal ? <ModalWrapper title="Preview Business">
          <div className="px-4 my-2 flex flex-col gap-4">
            <div className="p-4 h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Type */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Type
                  </h3>
                  <p className="text-gray-600">
                    {registration?.typeOfBusiness || "N/A"}
                  </p>
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Name
                  </h3>
                  <p className="text-gray-600">
                    {registration?.businessName || "N/A"}
                  </p>
                </div>

                {/* CIN Number */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    CIN Number
                  </h3>
                  <p className="text-gray-600">{registration?.cinNumber || "N/A"}</p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">Role</h3>
                  <p className="text-gray-600">{ registration?.roleOfCompany ? "Yes" : "No"}</p>
                </div>

                {/* Year of Establishment */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Year of Establishment
                  </h3>
                  <p className="text-gray-600">
                    {registration?.yearOfStablish || "N/A"}
                  </p>
                </div>

                {/* Headquarters Location */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Headquarter Location
                  </h3>
                  <p className="text-gray-600">
                    {registration?.headQuarterLocation || "N/A"}
                  </p>
                </div>

                {/* Business Address */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Address
                  </h3>
                  <p className="text-gray-600">
                    {address?.businessAddress?.businessAddressL1},{" "}
                    {address?.businessAddress?.businessAddressCity},{" "}
                    {address?.businessAddress?.businessAddressState} -{" "}
                    {address?.businessAddress?.businessAddressPin || "N/A"}
                  </p>
                </div>

                {/* Communication Address */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Communication Address
                  </h3>
                  <p className="text-gray-600">
                    {address?.communicationAddress?.communicationAddressL1},{" "}
                    {address?.communicationAddress?.communicationAddressCity},{" "}
                    {address?.communicationAddress?.communicationAddressState} -{" "}
                    {address?.communicationAddress?.communicationAddressPin || "N/A"}
                  </p>
                </div>

                {/* Financial Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Financial Details
                  </h3>
                  <p className="text-gray-600">
                    Capital: {financial?.financialDetails?.capital || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Revenue: {financial?.financialDetails?.revenue || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Profit: {financial?.financialDetails?.profit || "N/A"}
                  </p>
                </div>

                {/* KYC Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    KYC Details
                  </h3>
                  <p className="text-gray-600">
                    Username: {
                    kyc?.kycDetails?.kycUser || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    ID Proof No: {kyc?.kycDetails?.id || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Address Proof No:{" "}
                    {kyc?.kycDetails?.addressProof || "N/A"}
                  </p>
                </div>

                {/* Funding Requirement */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Funding Requirement
                  </h3>
                  <p className="text-gray-600">
                    Funding Required:{" "}
                    {funding?.fundingRequirement?.lookingForFunding ? "Yes" : "No"}
                  </p>
                  <p className="text-gray-600">
                    Existing Business:{" "}
                    {funding?.fundingRequirement?.existingBusinessName
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
                  handleNextStep();
                  //setConfirmationModal(true);
                  //setSignedInMenuPopup(!signedInMenuPopup);
                   // Assuming this is the function to be triggered
                }}
                type="button"
                primary={true} // Assuming this is a valid prop
                disabled={loading}
              >
                 {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </ModalWrapper> : ""}
      </div>
     {!loading && confirmationModal && <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col text-center justify-center items-center gap-2 sm:px-10  sm:py-8">
          <img src="/images/congratulations.svg" width={120} alt="" />
          <h5 className="font-bold  text-3xl text-[#232323]">Congratulation</h5>
          <p className="text-base text-[#595959] font-medium">
            Thank you for availing this service.
          </p>
          <div className="flex flex-col w-full">
            <Button primary={true} onClick={onConfirmationModalClose}>Continue</Button>
          </div>
        </div>
      </ConfirmationModal>}
    </>
  );
};

export default BusinessPreview;
