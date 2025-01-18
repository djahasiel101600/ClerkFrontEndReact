import { Link, BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => <h1>Home Page</h1>;
const RCI = () => <h1>Report of Checks Issued</h1>;
const RD = () => <h1>Report of Disbursements</h1>;
const Communications = () => <h1>Communcations</h1>;
const Inventory = () => <h2>Inventory</h2>;

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">My App</div>
          <div className="space-x-4">
            <a href="/" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a
              href="/report-checks-issued"
              className="text-gray-300 hover:text-white"
            >
              Report of Checks Issued
            </a>
            <a
              href="/report-disbursements"
              className="text-gray-300 hover:text-white"
            >
              Report of Disbursements
            </a>
            <a
              href="/communications"
              className="text-gray-300 hover:text-white"
            >
              Communications
            </a>
            <a
              href="/document-inventory"
              className="text-gray-300 hover:text-white"
            >
              Document Inventory
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
