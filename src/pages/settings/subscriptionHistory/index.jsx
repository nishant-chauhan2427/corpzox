import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Table } from "../../../components/table";
import { Button } from "../../../components/buttons";

const subscriptionPackage = [
  {
    number: "5",
    label: "Active Subscription",
    description: "Manage all your active subscriptions efficiently.",
    data: [
      {
        subscription: "Private Limited Company",
        status: "Active",
        amount: 2999,
        paymentMethod: "3243",
        renewDate: "Mar 23, 2025",
        plan: "Basic",
      },
      {
        subscription: "Private Limited Company",
        status: "Active",
        amount: 2999,
        paymentMethod: "3243",
        renewDate: "Mar 23, 2025",
        plan: "Basic",
      },
    ],
  },
  {
    number: "12",
    label: "Expired Subscription",
    description: "Manage all your expired subscriptions efficiently.",
    data: [
      {
        subscription: "Public Limited Company",
        status: "Expired",
        amount: 2499,
        paymentMethod: "3244",
        renewDate: "Jan 20, 2023",
        plan: "Basic",
      },
    ],
  },
  {
    number: "2",
    label: "Upcoming Renewals",
    description: "Manage all your upcoming renewals efficiently.",
    data: [
      {
        subscription: "LLP",
        status: "Upcoming",
        amount: 1999,
        paymentMethod: "3245",
        renewDate: "Nov 10, 2024",
        plan: "Basic",
      },
    ],
  },
];

const columns = [
  { header: "Subscription", accessor: "subscription" },
  { header: "Status", accessor: "status" },
  { header: "Amount", accessor: "amount" },
  { header: "Payment Method", accessor: "paymentMethod" },
  { header: "Renew Date", accessor: "renewDate" },
];

const SubscriptionHistory = () => {
  const [packageType, setPackageType] = useState("");
  const [packageIndex, setPackageIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (button) => {
    switch (button) {
      case "Previous":
        setPackageIndex((prev) =>
          prev > 0 ? prev - 1 : subscriptionPackage.length - 1
        );
        break;
      case "Next":
        setPackageIndex((prev) =>
          prev < subscriptionPackage.length - 1 ? prev + 1 : 0
        );
        break;
      default:
        break;
    }
  };

  const currentPackage = subscriptionPackage[packageIndex];

  return (
    <div>
      {packageType !== "" ? (
        <>
          {currentPackage ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 font-semibold text-xl text-[#0A1C40]">
                <button onClick={() => navigate(-1)}>
                  <GoArrowLeft />
                </button>
                <p>{currentPackage.label}</p>
              </div>
              <h4 className="font-semibold text-lg">
                {currentPackage.description}
              </h4>
              <Table columns={columns} data={currentPackage.data} />
              <div className="flex justify-between items-center gap-3">
                <p>
                  <b>{currentPackage.data.length}</b> results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleNavigation("Previous")}
                    outline={true}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => handleNavigation("Next")}
                    outline={true}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {" "}
          <h4 className="font-semibold text-lg">
            Handle your subscription packages here
          </h4>
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {subscriptionPackage.map((data, index) => (
              <Card
                key={index}
                number={data.number}
                label={data.label}
                description={data.description}
                onClick={() => setPackageType(data.label)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionHistory;

const Card = ({ number, label, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start gap-4 px-5 py-5 border border-[#DFEAF2] hover:bg-[#007AFF] hover:text-white transition-all duration-300 ease-in-out hover:transition-all hover:duration-300 hover:ease-in-out rounded-[25px] cursor-pointer"
    >
      <h2 className="font-bold text-4xl">{number}</h2>
      <div>
        <label className="font-bold text-lg">{label}</label>
        <p className="text-sm">{description}</p>
      </div>
      <button>View All</button>
    </div>
  );
};
