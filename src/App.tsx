import IARForm from "./components/forms/IARForm";
import POForm from "./components/forms/POForm";
import PageLayout from "./components/Layouts/PageLayout";
import Home from "./components/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RCI from "./components/Pages/RCI";
import RD from "./components/Pages/RD";
import Communications from "./components/Pages/Communications";
import DocumentInventory from "./components/Pages/DocumentInventory";
import { RCIType, columns } from "./rci/columns";
import { DataTable } from "./rci/data-table";
import fetchData from "./services/Api";
import CustomForm from "./components/forms/Form";

async function getData(): Promise<RCIType[]> {
  // Fetch data from your API here.
  const url = "http://127.0.0.1:8000/api/asdi-lfps-disbursment-voucher-record/";
  return await fetchData(url);
}

import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<RCIType[]>([]);

  useEffect(() => {
    getData().then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/report-checks-issued"
            element={
              <PageLayout>
                <DataTable columns={columns} data={data} />
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
      <CustomForm></CustomForm>
    </>
  );
}
