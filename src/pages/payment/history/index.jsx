import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { Button } from "../../../components/buttons";
import { NoData } from "../../../components/errors/noData";
import { TableShimmer } from "../../../components/loader/TableShimmer";
import { ConfirmationModal } from "../../../components/modal/confirmationModal";
import Pagination from "../../../components/Pagination";
import { Table } from "../../../components/table";
import { downloadInvoice, getPaymentTransaction } from "../../../redux/actions/payment-history-action";
import { talkToAdvisor } from "../../../redux/actions/servicesDetails-actions";
import { clearUrl } from "../../../redux/slices/paymentHistorySlice";
import { formatReadableDate } from "../../../utils";

const History = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceId, setServiceId] = useState("");
  const {
    paymentHistory,
    isPaymentHistoryLoading,
    downloadTransactionUrl,
    isTransactionDownloading,
    totalTransaction,
  } = useSelector((state) => state.paymentHistory);
  const { isTalkToAdvisorLoading } = useSelector(
    (state) => state.serviceDetails
  );
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [viewTransactionDetails, setViewTransactionDetails] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({})
  const contentRef = useRef()
  const reactToPrintFn = useReactToPrint({ contentRef });
  const transformedTransactionHistory = paymentHistory?.map((history) => {
    return {
      id: {
        serviceId: history?.serviceId,
      },
      _id: {
        _id: history?._id,
      },
      transaction_id: history?.invoiceNumber,
      status: history?.paymentStatus,
      amount: history?.amount,
      currency: "INR",
      payment_date: formatReadableDate(history?.paymentDate),
    };
  });

  console.log(paymentHistory, "transformedTransactionHistory");
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
    const query = searchParams.get("search") || "";
    setCurrentPage(Number(page));
    dispatch(getPaymentTransaction({ page, query }));
  }, [searchParams, dispatch]);
  const onConfirmationModalClose = () => {
    setConfirmationModal(false);
  };
  const onViewTransactionClose = () => {
    setViewTransactionDetails(false);
  };

  const openViewTransactionDetails = (id) => {
    console.log(id, "transactionId");
    setViewTransactionDetails(true);
    const transactionDetails = paymentHistory.filter((payment) => {
      return payment._id === id;
    });

    setTransactionDetails(transactionDetails ? transactionDetails[0] : {});
  };
  console.log(transactionDetails, "transasdn,fkldnf");
  const handleNavigation = (direction) => {
    const totalPages = Math.ceil(totalTransaction / 10); // Calculate total pages
    const newPage = direction === "Next" ? currentPage + 1 : currentPage - 1;

    if (newPage < 1 || newPage > totalPages) return; // Prevent navigating out of bounds

    setSearchParams({ page: newPage });
  };

  const openCallToAdvisor = (serviceId) => {
    setServiceId(serviceId);
    setConfirmationModal(true);
  };
  const handleTalkTouOurAdvisors = (serviceId) => {
    console.log(serviceId, "clicked");
    const requestData = {
      userId: JSON.parse(localStorage.getItem("userInfo"))?.userId,
      serviceId: serviceId,
      status: "negotiation",
      quotationDate: Date.now(),
    };
    dispatch(talkToAdvisor(requestData));
  };
  useEffect(() => {
    if (!isTalkToAdvisorLoading) {
      onConfirmationModalClose();
    }
  }, [isTalkToAdvisorLoading]);
  const actionMenu = (id, _id) => {
    return (
      <div className="flex py-2 justify-evenly items-center">
        <Button primary={false} onClick={() => openViewTransactionDetails(_id)}>
          <img src="/icons/payment/print.svg" alt="" />
        </Button>
        <Button primary={false} onClick={() => openCallToAdvisor(id)}>
          <img src="/icons/payment/calling.svg" alt="" />
        </Button>
      </div>
    );
  };

  // const downloadTransaction = (transactionId) => {
  //   dispatch(downloadInvoice({transactionId}))
  // }
  const downloadTransaction = (transactionId) => {
    dispatch(downloadInvoice({ transactionId }));
  };
  useEffect(() => {
    if (downloadTransactionUrl) {
      // Automatically download the file when the URL is available
      const link = document.createElement("a");
      link.href = downloadTransactionUrl; // URL from Redux state
      link.download = ""; // Optional: Specify a file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset the URL after downloading to avoid re-triggering
      dispatch(clearUrl());
      onViewTransactionClose();
    }
  }, [downloadTransactionUrl, dispatch]);

  return (
    <>
      <div>
        {isPaymentHistoryLoading ? (
          <TableShimmer />
        ) : transformedTransactionHistory &&
          transformedTransactionHistory.length > 0 ? (
          <>
            <Table
              isExpandable={false}
              columns={columns}
              data={transformedTransactionHistory}
              actionMenu={actionMenu}
            />
          </>
        ) : (
          <div>
            <NoData />
          </div>
        )}

        <div className="flex justify-center items-center">
          <div className="flex items-center gap-2 pt-4">
            {/* <Button disabled={currentPage === 1} onClick={() => handleNavigation("Previous")} outline={true}>
              Previous
            </Button>
            <Button disabled={currentPage === Math.ceil(totalTransaction / 10)} onClick={() => handleNavigation("Next")} outline={true}>
              Next
            </Button> */}
            {totalTransaction > 10 && (
              <Pagination totalItems={totalTransaction} itemsPerPage={10} />
            )}
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
            Request Call back?
          </p>
          <p className="font-medium text-[16px] text-[#595959]">
            Your Assistant Manager will get in touch with you soon.
          </p>
          <div className="flex justify-center">
            <Button
              primary={true}
              isLoading={isTalkToAdvisorLoading}
              onClick={() => handleTalkTouOurAdvisors(serviceId)}
            >
              {" "}
              Continue
            </Button>
          </div>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={viewTransactionDetails}
        onClose={onViewTransactionClose}
      >
        <div ref={contentRef} className="flex flex-col gap-2 ">
          <div className="flex justify-center">
            <img src="/public/Corpzo-logo-Modal.svg" width={150} alt="" />
          </div>
          <div className="flex flex-row justify-between gap-2 pb-8 pt-4">
            <p className="font-semibold text-base  text-[#525252] ">
              Invoice Number -{" "}
              <span className="font-semibold text-base text-[#0A1C40]">
                {transactionDetails?.invoiceNumber}
              </span>
            </p>
            <p className="font-semibold text-base  text-[#525252] flex gap-2 ">
              Date of issue:
              <span className="font-semibold text-base text-[#0A1C40]">
                {formatReadableDate(transactionDetails?.paymentDate)}
              </span>
            </p>
          </div>
          <div className="pt-1">
            <div className="flex justify-between gap-2">
              <p className="font-semibold text-base  text-[#525252] flex  gap-4 ">
                Your order id
                <span className="font-semibold text-base text-[#0A1C40]">
                  {transactionDetails?.transactionId}
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
                  {transactionDetails?.paymentMode}
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
            <p className="font-semibold text-base  text-[#0A1C40] ">Amount</p>
            <p className="font-semibold text-base  text-[#0A1C40] ">
              ₹ {transactionDetails?.serviceDetails?.cost}
            </p>
          </div>
          {transactionDetails?.serviceappliedcouponandoffers && <div className="flex justify-between">
            <p className="font-semibold text-base  text-[#0A1C40] ">
              Discount Amount
            </p>
            <p className="font-semibold text-base text-[#0A1C40]">
              {transactionDetails?.serviceappliedcouponandoffers &&
                transactionDetails?.serviceappliedcouponandoffers[0]?.amount +
                  (transactionDetails?.serviceappliedcouponandoffers[1]
                    ?.amount || 0)}
            </p>
          </div>}
          <div className="flex justify-between bg-[#FFF4BA]  px-2 py-1">
            <p className="font-semibold text-base  text-[#0A1C40] ">
              Total amount paid
            </p>
            <p className="font-semibold text-base text-[#0A1C40]">
              {/* ₹{
                Array.isArray(transactionDetails?.serviceappliedcouponandoffers) &&
                  transactionDetails?.serviceappliedcouponandoffers.length > 0
                  ? transactionDetails?.serviceappliedcouponandoffers[0]?.amount
                  : transactionDetails?.amount
              } */}
              ₹ {transactionDetails?.amount}
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-10">
            <Button outline={true} onClick={reactToPrintFn}>
              {" "}
              <img src="/public/icons/payment/print.svg" alt="" />
              Print
            </Button>
            <Button
              primary={true}
              isLoading={isTransactionDownloading}
              onClick={() => downloadTransaction(transactionDetails._id)}
            >
              {" "}
              <img src="/public/icons/payment/download.svg" alt="" />
              Download
            </Button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default History;
