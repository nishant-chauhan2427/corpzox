import React, { useEffect, useState } from "react";
import Documents from "./components/documents";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/buttons";
import { previewDetail } from "../../../database";
import DocumentViewer from "./components/documentViewer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heading } from "../../../components/heading";
import client from "../../../redux/axios-baseurl";
import { FormShimmer } from "../../../components/loader/FormShimmer";
import { FaRupeeSign } from "react-icons/fa";
import { RouteProgressBar } from "../../../components/progressBar/routeBased";
import { businessType } from "../../business/createEdit/components/registration";

const PreviewPayment = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [businessDetails, setBusinessDetails] = useState(null);
  const [servicePayment, setServicePayment] = useState(null);
  const [isPaymentDetailsLoading, setIsPaymentDetailsLoading] = useState(false);
  const [dynamicForm, setDynamicForm] = useState(null);
  const [pdfList, setPDFList] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const { applicationId } = useParams();

  // console.log("isPaymentDetailsLoading:", isPaymentDetailsLoading);

  // console.log("paymentDetails : ", paymentDetails);
  // console.log("businessDetails", businessDetails);
  // console.log("servicePayment", servicePayment);


  // console.log("dynamicForm", dynamicForm);
  // console.log("pdfList",pdfList);

  // console.log("loading", loading);




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

  const previewPdf = [
    {
      view: "View",
    },
    {
      view: "View",
    },
    {
      view: "View",
    },
  ];

  useEffect(() => {
    if (paymentDetails) {
      setBusinessDetails(paymentDetails?.businessdetails ? paymentDetails?.businessdetails[0] : null);
      setServicePayment(paymentDetails?.servicepayments ? paymentDetails?.servicepayments[0] : null);
    }
  }, [paymentDetails])

  //Get PDF List from dynamic Form
  useEffect(() => {
    if (dynamicForm) {
      const docs = dynamicForm?.filter((data) => data.inputType === "file");
      setPDFList(docs)
    }
  }, [dynamicForm])


  //get Payment Details API Call
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setIsPaymentDetailsLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get("/application/payment-preview-details", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params: {
            applicationId: applicationId
          }
        });
        setPaymentDetails(response.data?.data[0]);
      } catch (err) {
        console.log(err, "Error while GET payment details");
        // setError(err);
      } finally {
        setIsPaymentDetailsLoading(false);
      }
    }

    fetchPaymentDetails();
  }, [])

  //Get Form data from this API Call
  useEffect(() => {
    const fetchDynamicForm = async () => {
      try {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo?.token;

        if (!token) {
          return rejectWithValue("No token found");
        }

        const response = await client.get("/application/application-purchased-form", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          params: {
            applicationId: applicationId
          }
        });
        setDynamicForm(response.data?.data);
      } catch (err) {
        console.log(err, "get offer list error");
      } finally {
        setLoading(false);
      }
    }

    fetchDynamicForm();
  }, []);


  return (
    <>
      <div className="py-5">
        <RouteProgressBar currStep={3} totalSteps={3} />
        <h1 className="font-semibold text-[#0A1C40] text-base">Form Details</h1>
        <hr />
        {loading ? <FormShimmer count={3} className={"mt-3"} /> :
          <div div className=" ">

            {/* <Documents control={control} errors={errors} /> */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 sm:w-[60%] py-5">
              {pdfList?.map((data, index) => {

                if (data?.type === "document")

                  return <div
                    key={index}
                    className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
                  >
                    {data?.fileName}
                    <img
                      src="/images/payment/pdf-preview.svg"
                      width={100}
                      alt=""
                    />
                    {(data?.value && data.value[0]) ? <Link to={data?.value[0]} className="text-[#007AFF]  font-normal text-base underline">
                      view
                    </Link> :
                      <p>File not uploaded</p>
                    }
                  </div>
                else if (data?.type === "image") {
                  return <div
                    key={index}
                    className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
                  >
                    {data?.fileName}
                    <img
                      src={data?.value[0]}
                      width={100}
                      alt="image"
                    />
                    {(data?.value && data.value[0]) ? <Link to={data?.value[0]} className="text-[#007AFF]  font-normal text-base underline">
                      view
                    </Link> :
                      <p>File not uploaded</p>
                    }
                  </div>
                } else {
                  return <div
                    key={index}
                    className="flex bg-[#7676801F] pt-12 rounded gap-2  pb-4 py-4 flex-col justify-center items-center"
                  >
                    {data?.fileName}
                    <img
                      src="/images/payment/pdf-preview.svg"
                      width={100}
                      alt=""
                    />
                    {(data?.value && data.value[0]) ? <Link to={data?.value[0]} className="text-[#007AFF]  font-normal text-base underline">
                      view
                    </Link> :
                      <p>File not uploaded</p>
                    }
                  </div>
                }
              })}
            </div>
            {dynamicForm?.map((field, index) =>
              field.inputType !== "file" &&
              <div
                key={index}
                className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%] mt-4"
              >
                <p className="text-[#525252] font-medium text-base">
                  {field?.lebel}
                </p>
                <p className="font-semibold text-[#0A1C40] text-base">
                  {field?.value?.map(el => `${el||". . ."} `)}
                </p>
              </div>
            )}
          </div>
        }

        {isPaymentDetailsLoading ? <FormShimmer count={2} className={"mt-3"} /> :
          <div className="flex sm:flex-col flex-col gap-5 mt-10">
            <h1 className="font-semibold text-[#0A1C40] text-base">Business Details</h1>
            <hr />

            {/* {previewDetail.map((data, index) => (
            <div
              key={index}
              className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]"
            >
              <p className="text-[#525252] font-medium text-base">
                {data.title}
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {data.description}
              </p>
            </div>
          ))} */}

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Business name :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {businessDetails?.businessName ||". . ."}
              </p>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Business type :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {/* {businessDetails?.typeOfBusiness ||". . ."} */}
                {businessType?.filter((el)=>el.value===businessDetails?.typeOfBusiness)[0]?.label || "N/A"}

              </p>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Headquarter location :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {businessDetails?.headQuarterLocation ||". . ."}
              </p>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Industry type :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {businessDetails?.industry ||". . ."}
              </p>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Industry subtype :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {businessDetails?.subIndustry ||". . ."}
              </p>
            </div>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Year of stablish :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {new Date(businessDetails?.yearOfStablish).getFullYear() || ". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">
                Status :
              </p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {businessDetails?.active ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>}
              </p>
            </div>

          </div>
        }
        {/* <div className="mt-4 flex gap-2 flex-col">
          <p className="font-medium text-lg  text-[#525252] ">
            Business Description
          </p>
          <p className="text-base text-[#0A1C40] font-semibold ">
            A platform that helps aspiring entrepreneurs and startups to
            kickstart their businesses by offering document verification,
            state-specific guidance, and startup assistance.
          </p>
          <div className="inline-block mt-5">
            {" "}
            <Button primary={true}> Confirm</Button>
          </div>
        </div> */}

        {isPaymentDetailsLoading ? <FormShimmer count={2} className={"mt-3"} /> :

          <div className="flex sm:flex-col flex-col gap-5 mt-10">
            <h1 className="font-semibold text-[#0A1C40] text-base">Payment & Service Details</h1>
            <hr />
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Amount:</p>
              <p className="font-semibold text-[#0A1C40] text-base flex justify-center items-center">
                <FaRupeeSign className="ml-1" />{servicePayment?.amount ||". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Service Name:</p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {servicePayment?.serviceDetails?.name ||". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Payment Mode:</p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {servicePayment?.paymentMode ||". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Payment Status:</p>
              <p className="font-semibold text-green-600 text-base">
                {servicePayment?.paymentStatus ||". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Transaction ID:</p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {servicePayment?.transactionId ||". . ."}
              </p>
            </div>
            <div className="flex sm:flex-row flex-col sm:justify-between sm:w-[70%]">
              <p className="text-[#525252] font-medium text-base">Payment Date:</p>
              <p className="font-semibold text-[#0A1C40] text-base">
                {new Date(servicePayment?.paymentDate).toLocaleString() ||". . ."}
              </p>
            </div>
          </div>
        }

        <div className=" mt-5 flex justify-between items-center">
          <Button primary={true} onClick={() => navigate(-1)}>Prev</Button>
          <Button disabled={isPaymentDetailsLoading} onClick={() => navigate("/business")} primary={true}> Confirm</Button>
        </div>
      </div >
    </>
  );
};

export default PreviewPayment;
