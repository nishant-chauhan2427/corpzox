const subscriptionPackage = [
  {
    number: "5",
    label: "Active Subscription",
    description:
      "Manage all your active subscription efficiently. Click below to view all your subscriptions",
  },
  {
    number: "12",
    label: "Expired Subscription",
    description:
      "Manage all your active subscription efficiently. Click below to view all your subscriptions",
  },
  {
    number: "2",
    label: "Upcoming Renewals",
    description:
      "Manage all your active subscription efficiently. Click below to view all your subscriptions",
  },
];

const SubscriptionHistory = () => {
  return (
    <div>
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
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionHistory;

const Card = ({ number, label, description }) => {
  return (
    <div className="flex flex-col items-start gap-4 px-5 py-5 border border-[#DFEAF2]  hover:bg-[#007AFF] hover:text-white rounded-[25px] cursor-pointer">
      <h2 className="font-bold text-4xl">{number}</h2>
      <div>
        <label className="font-bold text-lg">{label}</label>
        <p className="text-sm">{description}</p>
      </div>
      <button>View All</button>
    </div>
  );
};
