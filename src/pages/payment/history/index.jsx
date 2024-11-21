import { Link } from "react-router-dom";
import { Button } from "../../../components/buttons";
import { Heading } from "../../../components/heading";
import { Table } from "../../../components/table";
import { useState } from "react";
import { ReactModal } from "../../../components/modal";
import { FaPlus } from "react-icons/fa";

const History = () => {
  const [InvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const columns = [
    { header: "Transaction ID", accessor: "transaction_id" },
    { header: "Status", accessor: "status" },
    { header: "Amount", accessor: "amount" },
    { header: "P. Method", accessor: "payment_method" },
    { header: "Payment Date", accessor: "payment_date" },
    { header: "Actions", accessor: "actions" },
  ];

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

  const invoicetoggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const actionMenu = () => {
    return (
      <div className="flex py-2 justify-evenly items-center">
        <Link
          nClick={(e) => {
            e.preventDefault();
            invoicetoggleModal();
          }}
        >
          <img src="/icons/payment/paymentPrint.svg" alt="" />
        </Link>
        <img src="/icons/payment/calling.svg" alt="" />
      </div>
    );
  };

  return (
    <>
      <div>
        <Heading backButton={true}>Payment History</Heading>
        <Table
          isExpandable={false}
          columns={columns}
          data={paymentData}
          actionMenu={actionMenu}
        />
        <div className="flex justify-between items-center">
          <p className="font-normal text-sm text-[#4B5563]">
            <span className="font-semibold">5</span> results
          </p>
          <div className="flex items-center gap-2 pt-4">
            <Button onClick={() => handleNavigation("Previous")} outline={true}>
              Previous
            </Button>
            <Button onClick={() => handleNavigation("Next")} outline={true}>
              Next
            </Button>
          </div>
        </div>
        <div className="flex text-center flex-col">
          <img src="/public/logo.svg" alt="" />
          <div>
            <p className="font-semibold text-lg  text-[#525252] ">
              Invoice Number -{" "}
              <span className="font-semibold text-lg text-[#0A1C40]">
                INV-2024-001
              </span>
            </p>
            <p className="font-semibold text-lg  text-[#525252] ">
              Date of issue:
              <span className="font-semibold text-lg text-[#0A1C40]">
                November 19, 2024
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg  text-[#525252] ">
              Your order id
              <span className="font-semibold text-lg text-[#0A1C40]">
                ORD-2024-789
              </span>
            </p>
            <p className="font-semibold text-lg  text-[#525252] ">
              Billed To:
              <span className="font-semibold text-lg text-[#0A1C40]">
                CorpZo Pvt. Ltd.
              </span>
            </p>
          </div>
          <div>
            <p className="font-semibold text-lg  text-[#525252] ">
              Payment method
              <span className="font-semibold text-lg text-[#0A1C40]">
                Hdfc debit card
              </span>
            </p>
            <p></p>
          </div>
          <div>
            <p className="font-semibold text-lg  text-[#525252] ">
              Description
            </p>
            <p className="font-semibold text-lg  text-[#525252] ">Amount</p>
          </div>
          <hr />
          <div>
            <p className="font-semibold text-lg  text-[#0A1C40] ">
              Discount Coupon
            </p>
            <p className="font-semibold text-lg  text-[#0A1C40] ">10%</p>
          </div>
          <div>
            <p className="font-semibold text-lg  text-[#0A1C40] ">Amount</p>
            <p className="font-semibold text-lg  text-[#0A1C40] ">₹7,499.00</p>
          </div>
          <div>
            <p className="font-semibold text-lg  text-[#0A1C40] ">
              Total amount paid
            </p>
            <p className="font-semibold text-lg  text-[#0A1C40] ">₹6,749.00</p>
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={InvoiceModalOpen}
        onRequestClose={() => setInvoiceModalOpen(false)}
        button={
          <FaPlus
            size={25}
            color="#abaaaa"
            className="bg-[#D9D9D9] px-1 py-1 rounded-full"
          />
        }
      >
        <div>hd</div>
      </ReactModal>
    </>
  );
};

export default History;
