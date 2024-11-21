import { Heading } from "../../../components/heading";
import { Table } from "../../../components/table";

const History = () => {
  const columns = [
    { header: "Transaction ID", accessor: "transaction_id" },
    { header: "Status", accessor: "status" },
    { header: "Amount", accessor: "amount" },
    { header: "P. Method", accessor: "payment_method" },
    { header: "Payment Date", accessor: "payment_date" },
    { header: "Actions", accessor: "actions" },
  ];
  const payment = [
    {
      transactions: [
        {
          transaction_id: "06c1774-7f3d-46ad...90a8",
          status: "Succeeded",
          amount: "19,623.00",
          currency: "INR",
          payment_date: "Mar 23, 2022, 13:00 PM",
          actions: {
            view: <img src="/icons/payment/paymentPrint.svg" alt="" />,
            refund: <img src="/icons/payment/calling.svg" alt="" />,
          },
        },
        {
          transaction_id: "06c1774-7f3d-46ad...90a8",
          status: "Declined",
          amount: "1,623.00",
          currency: "INR",
          payment_date: "Mar 23, 2022, 13:00 PM",
          actions: {
            view: <img src="/icons/payment/paymentPrint.svg" alt="" />,
            refund: <img src="/icons/payment/calling.svg" alt="" />,
          },
        },
        {
          transaction_id: "06c1774-7f3d-46ad...90a8",
          status: "Declined",
          amount: "1,623.00",
          currency: "INR",
          // payment_method: {},
          payment_date: "Mar 23, 2022, 13:00 PM",
          actions: {
            view: <img src="/icons/payment/paymentPrint.svg" alt="" />,
            refund: <img src="/icons/payment/calling.svg" alt="" />,
          },
        },
      ],
      pagination: {
        total_results: 5,
        current_page: 1,
        results_per_page: 3,
      },
    },
  ];

  const packageIndex = 0;
  const currentPackage = payment[packageIndex];

  const processedData = currentPackage.transactions.map((transaction) => ({
    ...transaction,
    actions: Object.keys(transaction.actions)
      .filter((key) => transaction.actions[key])
      .map((action) => <button key={action}>{action}</button>),
  }));

  return (
    <div>
      <Heading backButton={true}>Payment History</Heading>
      <Table columns={columns} data={processedData} />
    </div>
  );
};

export default History;
