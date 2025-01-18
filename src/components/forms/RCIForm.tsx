import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function RCIForm() {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">RCI Form</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Please fill out the form below with the required information.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="ada-check-date"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ADA/Check Date
              </label>
              <div className="mt-2">
                <input
                  id="ada-check-date"
                  name="ada-check-date"
                  type="date"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="ada-check-no"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ADA/Check No
              </label>
              <div className="mt-2">
                <input
                  id="ada-check-no"
                  name="ada-check-no"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="dv-no"
                className="block text-sm/6 font-medium text-gray-900"
              >
                DV No
              </label>
              <div className="mt-2">
                <input
                  id="dv-no"
                  name="dv-no"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="asa-no"
                className="block text-sm/6 font-medium text-gray-900"
              >
                ASA No
              </label>
              <div className="mt-2">
                <input
                  id="asa-no"
                  name="asa-no"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="payee"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Payee
              </label>
              <div className="mt-2">
                <input
                  id="payee"
                  name="payee"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="nature-of-transaction"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Nature of Transaction
              </label>
              <div className="mt-2">
                <input
                  id="nature-of-transaction"
                  name="nature-of-transaction"
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="amount-net-of-tax"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Amount (Net of Tax)
              </label>
              <div className="mt-2">
                <input
                  id="amount-net-of-tax"
                  name="amount-net-of-tax"
                  type="number"
                  step="0.01"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="amount-gross-tax"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Amount (Gross Tax)
              </label>
              <div className="mt-2">
                <input
                  id="amount-gross-tax"
                  name="amount-gross-tax"
                  type="number"
                  step="0.01"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900"
          >
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
  );
}
