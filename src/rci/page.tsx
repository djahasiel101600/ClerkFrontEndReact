import { RCIType, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<RCIType[]> {
  // Fetch data from your API here.
  return [
    {
      id: 10000,
      amount: 10000,
      dv: "0000-00-000",
      payee: "John Doe",
      nature_of_transaction: "Cash",
      gross_amount: 10000,
      amount_net_of_tax: 10000,
    },
  ];
}

export default async function RCITable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
