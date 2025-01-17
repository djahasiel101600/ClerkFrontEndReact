import { useState } from 'react'

export default function POForm() {
  const [dateReceivedCOA, setDateReceivedCOA] = useState('')
  const [delayDuration, setDelayDuration] = useState(0)

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDateReceivedCOA(date);
  
    if (!date) {
      setDelayDuration(0);
      return;
    }
  
    const receivedDate = new Date(date);
    const currentDate = new Date();
  
    // Normalize dates to midnight to avoid partial day differences
    receivedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    const diffTime = Math.abs(currentDate.getTime() - receivedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    setDelayDuration(diffDays);
  };
  

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">PO Form</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Please fill out the form below with the required information.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="po-no" className="block text-sm/6 font-medium text-gray-900">
                PO No
              </label>
              <div className="mt-2">
                <input
                  id="po-no"
                  name="po-no"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="supplier" className="block text-sm/6 font-medium text-gray-900">
                Supplier
              </label>
              <div className="mt-2">
                <input
                  id="supplier"
                  name="supplier"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="po-date" className="block text-sm/6 font-medium text-gray-900">
                PO Date
              </label>
              <div className="mt-2">
                <input
                  id="po-date"
                  name="po-date"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="delivery-date" className="block text-sm/6 font-medium text-gray-900">
                Delivery Date
              </label>
              <div className="mt-2">
                <input
                  id="delivery-date"
                  name="delivery-date"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="delivery-term" className="block text-sm/6 font-medium text-gray-900">
                Delivery Term
              </label>
              <div className="mt-2">
                <input
                  id="delivery-term"
                  name="delivery-term"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="particulars" className="block text-sm/6 font-medium text-gray-900">
                Particulars
              </label>
              <div className="mt-2">
                <textarea
                  id="particulars"
                  name="particulars"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="purpose" className="block text-sm/6 font-medium text-gray-900">
                Purpose
              </label>
              <div className="mt-2">
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="amount" className="block text-sm/6 font-medium text-gray-900">
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="date-signed-supplier" className="block text-sm/6 font-medium text-gray-900">
                Date Signed - Supplier
              </label>
              <div className="mt-2">
                <input
                  id="date-signed-supplier"
                  name="date-signed-supplier"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="remarks" className="block text-sm/6 font-medium text-gray-900">
                Remarks
              </label>
              <div className="mt-2">
                <textarea
                  id="remarks"
                  name="remarks"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="received-by" className="block text-sm/6 font-medium text-gray-900">
                Received By
              </label>
              <div className="mt-2">
                <input
                  id="received-by"
                  name="received-by"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="submitted-by" className="block text-sm/6 font-medium text-gray-900">
                Submitted By
              </label>
              <div className="mt-2">
                <input
                  id="submitted-by"
                  name="submitted-by"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="agency" className="block text-sm/6 font-medium text-gray-900">
                Agency
              </label>
              <div className="mt-2">
                <input
                  id="agency"
                  name="agency"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="date-received-coa" className="block text-sm/6 font-medium text-gray-900">
                Date Received - COA
              </label>
              <div className="mt-2">
                <input
                  id="date-received-coa"
                  name="date-received-coa"
                  type="date"
                  value={dateReceivedCOA}
                  onChange={handleDateChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="delay-duration" className="block text-sm/6 font-medium text-gray-900">
                Delay Duration (Days)
              </label>
              <div className="mt-2">
                <input
                  id="delay-duration"
                  name="delay-duration"
                  type="number"
                  value={delayDuration}
                  readOnly
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
