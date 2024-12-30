import { useEffect, useState } from "react";
import { Selector } from "../../../components/select";
import { Heading } from "../../../components/heading";
import { NoData } from "../../../components/errors/noData";
import {
  getService,
  getServiceData,
} from "../../../redux/actions/document-action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentCardShimmer } from "../../../components/loader/DocumentCardShimmer";
import { DocumentListShimmer } from "../../../components/loader/DocumentListShimmer";

const DocumentsListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {
    documentList: services = [],
    dataList: folders = [],
    isLoading,
    isdocumentLoading,
    isDataLoading,
    listData,
    fetchingDocumentError,
  } = useSelector((state) => state.document);

  const [selectedServiceInfo, setSelectedServiceInfo] = useState(null);
  const { id } = useParams();
//console.log(listData,"Document DATA");
  useEffect(() => {
      dispatch(getService());   
      dispatch(getServiceData({formId:"",serviceId:""}));
  }, []);
  
  const handleFolderClick = (_id) => {
    navigate(`/documents/detail/${_id}`);
  };

  console.log("selected folder",folders);

  const servicesOptions = Array.isArray(services)
    ? services.map((item) => ({
      label: item.serviceName,
      value: item.serviceId,
      formId: item.formId,
    }))
    : [];

  const handleServiceSelection = (selectedOption) => {
    dispatch(
      getServiceData({
        formId: selectedOption?.formId,
        serviceId: selectedOption?.value,
      })
    );
    setSelectedServiceInfo({
      formId: selectedOption.formId,
      serviceId: selectedOption.value,
    });
  };

  return (
    <div>
      {isLoading ? (
        <DocumentCardShimmer />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Heading backButton={true} title={"Documents"} tourButton={true}>
              Documents {folders?.length ? `(${folders.length})` : ""}
            </Heading>
          </div>
          <div>
            <Selector
              className={"!min-w-52 !max-w-fit"}
              isClearable={true}
              label={"Folders"}
              placeholder={"Select Services"}
              options={servicesOptions}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  dispatch(
                    getServiceData({
                      formId: selectedOption.formId,
                      serviceId: selectedOption.value,
                    })
                  );
                  setSelectedServiceInfo({
                    formId: selectedOption.formId,
                    serviceId: selectedOption.value,
                  });
                } else {
                  setSelectedServiceInfo(null);
                  dispatch(getServiceData({ formId: "", serviceId: "" }));
                }
              }}
              value={
                selectedServiceInfo 
                  ? servicesOptions.find(
                    (option) => option.value === selectedServiceInfo.serviceId
                  )
                  : null
              }
            />
          </div>

          <div className="py-4">
            {isDataLoading ? (
              <div className="flex justify-center items-center py-8">
                <DocumentListShimmer />
              </div>
            ) : folders.length > 0 ? (
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {folders.map((data) => (
                  <div
                    key={data._id}
                    onClick={() => handleFolderClick(data._id)}
                    className="relative bg-[#F2F2F2] px-4 py-2 flex cursor-pointer justify-between items-center gap-4 border rounded"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="/icons/documents/folder.svg"
                        alt="folder-icon"
                      />
                      <p className="font-semibold text-xs">{data?.caseId}</p>
                    </div>
                    <button></button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-[50vh]">
                <NoData />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DocumentsListing;
