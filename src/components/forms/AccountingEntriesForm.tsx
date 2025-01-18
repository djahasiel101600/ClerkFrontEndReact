import React, { useState } from "react";

// Define the type for an accounting entry
interface AccountingEntry {
  accountTitle: string;
  debit: number;
  credit: number;
}

function AccountingEntriesForm() {
  const [entries, setEntries] = useState<AccountingEntry[]>([
    { accountTitle: "", debit: 0, credit: 0 }, // Initial entry
  ]);

  // Handle changes in individual fields
  const handleChange = (
    index: number,
    field: keyof AccountingEntry,
    value: string | number
  ) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value as never;
    setEntries(updatedEntries);
  };

  // Add a new entry
  const handleAddEntry = () => {
    setEntries([...entries, { accountTitle: "", debit: 0, credit: 0 }]);
  };

  // Remove an entry
  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Entries:", entries);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <h2 className="text-lg font-bold">Accounting Entries</h2>
      {entries.map((entry, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Account Title"
            value={entry.accountTitle}
            onChange={(e) =>
              handleChange(index, "accountTitle", e.target.value)
            }
            className="border p-2 rounded-md w-1/3"
          />
          <input
            type="number"
            placeholder="Debit"
            value={entry.debit}
            onChange={(e) =>
              handleChange(index, "debit", parseFloat(e.target.value) || 0)
            }
            className="border p-2 rounded-md w-1/4"
          />
          <input
            type="number"
            placeholder="Credit"
            value={entry.credit}
            onChange={(e) =>
              handleChange(index, "credit", parseFloat(e.target.value) || 0)
            }
            className="border p-2 rounded-md w-1/4"
          />
          <button
            type="button"
            onClick={() => handleRemoveEntry(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAddEntry}
          className="rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Entry
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AccountingEntriesForm;
