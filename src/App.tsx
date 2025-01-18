import IARForm from "./components/forms/IARForm";
import POForm from "./components/forms/POForm";
import PageLayout from "./components/Layouts/PageLayout";
import Home from "./components/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RCI from "./components/Pages/RCI";
import RD from "./components/Pages/RD";
import Communications from "./components/Pages/Communications";
import DocumentInventory from "./components/Pages/DocumentInventory";
import { Payment, columns } from "./rci/columns";
import { DataTable } from "./rci/data-table";

export default function App() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      payee: "Hearts Foods Hub",
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/report-checks-issued"
            element={
              <PageLayout>
                <RCI />
              </PageLayout>
            }
          />
          <Route
            path="/report-disbursements"
            element={
              <PageLayout>
                <RD />
              </PageLayout>
            }
          />
          <Route
            path="/communications"
            element={
              <PageLayout>
                <Communications />
              </PageLayout>
            }
          />
          <Route
            path="/communications/iar"
            element={
              <PageLayout>
                <IARForm />
              </PageLayout>
            }
          />
          <Route
            path="/communications/po"
            element={
              <PageLayout>
                <POForm />
              </PageLayout>
            }
          />
          <Route
            path="/document-inventory"
            element={
              <PageLayout>
                <DocumentInventory />
              </PageLayout>
            }
          />
        </Routes>
      </BrowserRouter>
      <DataTable columns={columns} data={data} />
    </>
  );
}
