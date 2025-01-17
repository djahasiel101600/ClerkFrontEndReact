import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">My App</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link to="/report-checks-issued" className="text-gray-300 hover:text-white">
            Report of Checks Issued
          </Link>
          <Link to="/report-disbursements" className="text-gray-300 hover:text-white">
            Report of Disbursements
          </Link>
          <Link to="/communications" className="text-gray-300 hover:text-white">
            Communications
          </Link>
          <Link to="/document-inventory" className="text-gray-300 hover:text-white">
            Document Inventory
          </Link>
        </div>
      </div>
    </nav>
  )
}
