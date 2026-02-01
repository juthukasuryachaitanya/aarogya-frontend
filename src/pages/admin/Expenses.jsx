import { useEffect, useState } from "react";

export function Expenses() {
  const CATEGORY_OPTIONS = [
    "Fruits",
    "Fuel",
    "Packaging",
    "Operations"
  ];

  /* ===================== */
  /* EXPENSE STATE */
  /* ===================== */
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: "2024-02-01",
      category: "Fruits",
      notes: "Apple & Banana",
      amount: 1200,
    },
    {
      id: 2,
      date: "2024-02-01",
      category: "Fuel",
      notes: "Delivery fuel",
      amount: 300,
    },
    {
      id: 3,
      date: "2024-02-02",
      category: "Packaging",
      notes: "Bowls & covers",
      amount: 450,
    },
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      date: `2024-02-0${(i % 5) + 1}`,
      category: i % 2 === 0 ? "Fruits" : "Fuel",
      notes: "Daily expense",
      amount: 200 + i * 10,
    })),
  ]);

  /* ===================== */
  /* ADD EXPENSE FORM */
  /* ===================== */
  const [form, setForm] = useState({
    date: "",
    category: "",
    notes: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: expenses.length + 1,
      date: form.date,
      category: form.category,
      notes: form.notes,
      amount: Number(form.amount),
    };

    setExpenses([newExpense, ...expenses]);
    setForm({ date: "", category: "", notes: "", amount: "" });
  };

  /* ===================== */
  /* FILTER STATES */
  /* ===================== */
  const [selectedDate, setSelectedDate] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  /* ===================== */
  /* PAGINATION */
  /* ===================== */
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* ===================== */
  /* FILTER LOGIC */
  /* ===================== */
  const filteredExpenses = expenses.filter((e) => {
    const matchDate = selectedDate ? e.date === selectedDate : true;
    const matchCategory = categorySearch
      ? e.category.toLowerCase().includes(categorySearch.toLowerCase())
      : true;
    return matchDate && matchCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, categorySearch]);

  const totalPages = Math.ceil(filteredExpenses.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedExpenses = filteredExpenses.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const totalAmount = filteredExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Expenses
        </h1>
        <p className="text-gray-500">
          Track and add daily operational expenses
        </p>
      </div>

      {/* ===== ADD EXPENSE ===== */}
      <form
        onSubmit={handleAddExpense}
        className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-5 gap-4"
      >
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded-xl p-3"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="border rounded-xl p-3"
        >
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="border rounded-xl p-3"
        />

        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white rounded-xl font-semibold"
        >
          Add Expense
        </button>
      </form>

      {/* ===== FILTERS ===== */}
      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-3 gap-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-xl p-3"
        />

        <input
          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
          placeholder="Search by Category"
          className="border rounded-xl p-3"
        />

        <div className="flex items-center font-semibold text-gray-700">
          Total:
          <span className="ml-2 text-red-600">₹{totalAmount}</span>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Notes</th>
              <th className="px-4 py-3 text-right">Amount (₹)</th>
            </tr>
          </thead>
        </table>

        <div className="max-h-[320px] overflow-y-auto">
          <table className="min-w-full text-sm table-fixed">
            <tbody className="divide-y">
              {paginatedExpenses.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3">{e.date}</td>
                  <td className="px-4 py-3">{e.category}</td>
                  <td className="px-4 py-3 text-gray-500">{e.notes}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-semibold">
                    ₹{e.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  page === currentPage
                    ? "bg-green-600 text-white"
                    : "border"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
