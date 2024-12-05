import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Heading } from "../../../components/heading";
import { Table } from "../../../components/table";
import { useEffect, useState } from "react";
import { ReactModal } from "../../../components/modal";
import { FaPlus } from "react-icons/fa";
import { getPaymentTransaction } from "../../../redux/actions/payment-history-action";
import { useDispatch, useSelector } from "react-redux";
import { formatReadableDate } from "../../../utils";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { NoData } from "../../../components/errors/noData";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import { talkToAdvisor } from "../../../redux/actions/servicesDetails-actions";

const History = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceId, setServiceId] = useState("")
  const { paymentHistory, isPaymentHistoryLoading, totalTransaction } = useSelector((state) => state.paymentHistory)
  const {isTalkToAdvisorLoading} = useSelector((state)=> state.serviceDetails)
  const [confirmationModal, setConfirmationModal] = useState(false);
  const transformedTransactionHistory = paymentHistory?.map((history) => {
    return {
      id: {
        serviceId: history?.serviceId
      },
      transaction_id: history?.invoiceNumber,
      status: history?.paymentStatus,
      amount: history?.amount,
      currency: "INR",
      payment_date: formatReadableDate(history?.paymentDate),
    }
  })

  console.log(transformedTransactionHistory, "transformedTransactionHistory")
  const columns = [
    { header: "Transaction ID", accessor: "transaction_id" },
    { header: "Status", accessor: "status" },
    { header: "Amount", accessor: "amount" },
    { header: "P. Method", accessor: "payment_method" },
    { header: "Payment Date", accessor: "payment_date" },
    { header: "Actions", accessor: "actions" },
  ];

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    const query = searchParams.get('search') || ""
    setCurrentPage(Number(page));
    dispatch(getPaymentTransaction({ page, query }));
  }, [searchParams, dispatch]);
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };

  // const handleNavigation = (direction) => {
  //   const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;
  //   if (newPage < 1) return; // Prevent navigating to a negative page
  //   setSearchParams({ page: newPage });
  // };
  const handleNavigation = (direction) => {
    const totalPages = Math.ceil(totalTransaction / 10); // Calculate total pages
    const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;

    if (newPage < 1 || newPage > totalPages) return; // Prevent navigating out of bounds

    setSearchParams({ page: newPage });
  };

  const paymentData = [
    {
      transaction_id: "06c1774-7f3d-46ad...90a8",
      status: "Succeeded",
      amount: "19,623.00",
      currency: "INR",
      payment_date: "Mar 23, 2022, 13:00 PM",
    },
    {
      transaction_id: "06c1774-7f3d-46ad...90a8",
      status: "Declined",
      amount: "1,623.00",
      currency: "INR",
      payment_date: "Mar 23, 2022, 13:00 PM",
    },
    {
      transaction_id: "06c1774-7f3d-46ad...90a8",
      status: "Declined",
      amount: "1,623.00",
      currency: "INR",
      payment_date: "Mar 23, 2022, 13:00 PM",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openCallToAdvisor = (serviceId) => {
    setServiceId(serviceId);
 setConfirmationModal(true)
  }
  const handleTalkTouOurAdvisors = (serviceId) => {
    console.log(serviceId, "clicked")
    const requestData = {
      userId: JSON.parse(localStorage.getItem('userInfo'))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now()
    }
    dispatch(talkToAdvisor(requestData))

  }
  useEffect(()=>{
    if(!isTalkToAdvisorLoading){
      onConfirmationModalClose()
    }
  }, [isTalkToAdvisorLoading])
  const actionMenu = (id) => {
    return (
      <div className="flex py-2 justify-evenly items-center">
        <ReactModal
          crossButton={true}
          className="border-[#FF3B3B] border-[3px] py-2 w-[55%]"
          button={<img src="/icons/payment/paymentPrint.svg" alt="" />}
          onClick={handleTalkTouOurAdvisors}
        >
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-center">
              <img src="/public/Corpzo-logo-Modal.svg" width={150} alt="" />
            </div>
            <div className="flex flex-row justify-between gap-2 pb-8 pt-4">
              <p className="font-semibold text-base  text-[#525252] ">
                Invoice Number -{" "}
                <span className="font-semibold text-base text-[#0A1C40]">
                  INV-2024-001
                </span>
              </p>
              <p className="font-semibold text-base  text-[#525252] flex gap-2 ">
                Date of issue:
                <span className="font-semibold text-base text-[#0A1C40]">
                  November 19, 2024
                </span>
              </p>
            </div>
            <div className="pt-1">
              <div className="flex justify-between gap-2">
                <p className="font-semibold text-base  text-[#525252] flex  gap-4 ">
                  Your order id
                  <span className="font-semibold text-base text-[#0A1C40]">
                    ORD-2024-789
                  </span>
                </p>
                <p className="font-semibold text-base  text-[#525252]  text-start ">
                  Billed To: <br />
                  <span className="font-semibold text-base text-[#0A1C40]">
                    CorpZo Pvt. Ltd.
                  </span>
                </p>
              </div>
              <div className="flex justify-between ">
                <p className="font-semibold text-base  text-[#525252] flex gap-4">
                  Payment method
                  <span className="font-semibold text-base text-[#0A1C40]">
                    Hdfc debit card
                  </span>
                </p>
                <p></p>
              </div>
            </div>
            <div className="flex justify-between pt-8">
              <p className="font-semibold text-base  text-[#525252] ">
                Description
              </p>
              <p className="font-semibold text-base  text-[#525252] ">Amount</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p className="font-semibold text-base  text-[#0A1C40] ">
                Discount Coupon
              </p>
              <p className="font-semibold text-base  text-[#0A1C40] ">10%</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-base  text-[#0A1C40] ">Amount</p>
              <p className="font-semibold text-base  text-[#0A1C40] ">
                ₹7,499.00
              </p>
            </div>
            <div className="flex justify-between bg-[#FFF4BA]  px-2 py-1">
              <p className="font-semibold text-base  text-[#0A1C40] ">
                Total amount paid
              </p>
              <p className="font-semibold text-base  text-[#0A1C40] ">
                ₹6,749.00
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-10">
              <Button outline={true}>
                {" "}
                <img src="/public/icons/payment/print.svg" alt="" />
                Print
              </Button>
              <Button primary={true}>
                {" "}
                <img src="/public/icons/payment/download.svg" alt="" />
                Download
              </Button>
            </div>
          </div>
        </ReactModal>

        {/* <ReactModal
          crossButton={true}
          className="border-[#FF3B3B] border-[3px] py-2 "
          button={<img src="/icons/payment/calling.svg" alt="" />}
          onClick={handleTalkTouOurAdvisors}
        >
          <div className="flex flex-col gap-2 items-center justify-center ">
            <img src="/public/icons/payment/callback.svg" width={200} alt="" />
            <p className="text-3xl font-bold text-[#0A1C40]">
              Call Back Requested
            </p>
            <p className="font-medium text-[16px] text-[#595959]">
              Thank you for requesting a call-back. Your Assistant <br />
              Manager will get in touch with you soon.
            </p>
            <div className="flex justify-center">
              <Button primary={true}> Continue</Button>
            </div>
          </div>
        </ReactModal> */}
        <Button primary={false} onClick={() => openCallToAdvisor(id)}>
          <img src="/icons/payment/calling.svg" alt="" />
        </Button>
      </div>
    );
  };

  // const actionMenu = () => {
  //   <div className="flex py-2 justify-evenly items-center">


  //   </div>
  // }

  return (
    <>
      <div>
        {
          isPaymentHistoryLoading ? (
            <TableShimmer />
          ) : (
            transformedTransactionHistory && transformedTransactionHistory.length > 0 ? (
              <Table
                isExpandable={false}
                columns={columns}
                data={transformedTransactionHistory}
                actionMenu={actionMenu}
              />
            ) : (
              <div><NoData /></div>
            )
          )
        }


        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-[#4B5563]">
            <span className="font-semibold">{totalTransaction ? totalTransaction : 0}</span> results
          </p>
          <div className="flex items-center gap-2 pt-4">
            <Button disabled={currentPage === 1} onClick={() => handleNavigation("Previous")} outline={true}>
              Previous
            </Button>
            <Button disabled={currentPage === Math.ceil(totalTransaction / 10)} onClick={() => handleNavigation("Next")} outline={true}>
              Next
            </Button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal}
        onClose={onConfirmationModalClose}
      >
        <div className="flex flex-col gap-2 items-center justify-center ">
          <img src="/public/icons/payment/callback.svg" width={200} alt="" />
          <p className="text-3xl font-bold text-[#0A1C40]">
            Call Back Requested
          </p>
          <p className="font-medium text-[16px] text-[#595959]">
            Thank you for requesting a call-back. Your Assistant <br />
            Manager will get in touch with you soon.
          </p>
          <div className="flex justify-center">
            <Button primary={true} isLoading={isTalkToAdvisorLoading} onClick={()=> handleTalkTouOurAdvisors(serviceId)}> Continue</Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default History;
