import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "../../../components/wrappers/modal";
import BusinessListing from "../listing";
import { Button } from "../../../components/buttons";
import { useNavigate } from "react-router-dom";
import { createBusiness } from "../../../redux/slices/businessSlice";
import toast from "react-hot-toast";

const BusinessPreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business);

  console.log(business, "business");

  // Handle step navigation
  const handleNextStep = () => {
    dispatch(createBusiness());
    navigate("/business")
    toast.success("Business created succesfully!")
  };

  const handlePrevStep = () => {
    navigate("/business/create");
  };

  return (
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
                  {business?.businessAddress.line1},{" "}
                  {business?.businessAddress.city},{" "}
                  {business?.businessAddress.state} -{" "}
                  {business?.businessAddress.pinCode || "N/A"}
                </p>
              </div>

              {/* Communication Address */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Communication Address
                </h3>
                <p className="text-gray-600">
                  {business?.communicationAddress.line1},{" "}
                  {business?.communicationAddress.city},{" "}
                  {business?.communicationAddress.state} -{" "}
                  {business?.communicationAddress.pinCode || "N/A"}
                </p>
              </div>

              {/* Financial Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Financial Details
                </h3>
                <p className="text-gray-600">
                  Capital: {business?.financialDetails.capital || "N/A"}
                </p>
                <p className="text-gray-600">
                  Revenue: {business?.financialDetails.revenue || "N/A"}
                </p>
                <p className="text-gray-600">
                  Profit: {business?.financialDetails.profit || "N/A"}
                </p>
              </div>

              {/* KYC Details */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  KYC Details
                </h3>
                <p className="text-gray-600">
                  Username: {business?.kycDetails.username || "N/A"}
                </p>
                <p className="text-gray-600">
                  ID Proof No: {business?.kycDetails.idProofNo || "N/A"}
                </p>
                <p className="text-gray-600">
                  Address Proof No:{" "}
                  {business?.kycDetails.addressProofNo || "N/A"}
                </p>
              </div>

              {/* Funding Requirement */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Funding Requirement
                </h3>
                <p className="text-gray-600">
                  Funding Required:{" "}
                  {business?.fundingRequirement.fundingRequired || "N/A"}
                </p>
                <p className="text-gray-600">
                  Existing Business:{" "}
                  {business?.fundingRequirement.existingBusiness ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <Button type="button" outline={true} onClick={handlePrevStep}>
              Previous
            </Button>
            <Button type="button" primary={true} onClick={handleNextStep}>
              Submit
            </Button>
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default BusinessPreview;
