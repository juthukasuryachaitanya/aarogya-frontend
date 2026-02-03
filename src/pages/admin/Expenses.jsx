import { useEffect, useState } from "react";
import { api } from "../../api";
import { showToast } from "../../Utils/toast";

export function Expenses() {
  /* ===================== */
  /* CONSTANTS */
  /* ===================== */
  const CATEGORY_OPTIONS = ["Fruits", "Delivery", "Packing", "Operations"];
  const RECORDS_PER_PAGE = 10;

  /* ===================== */
  /* STATE */
  /* ===================== */
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    date: "",
    category: "",
    notes: "",
    amount: "",
  });

  const [filters, setFilters] = useState({
    date: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  /* ===================== */
  /* FETCH EXPENSES */
  /* ===================== */
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/expenses", {
        params: {
          date: filters.date || undefined,
          category: filters.category || undefined,
        },
      });
      setExpenses(res.data || []);
    } catch (err) {
      showToast("Failed to load expenses ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    setCurrentPage(1);
  }, [filters]);

  /* ===================== */
  /* ADD EXPENSE */
  /* ===================== */
  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      await api.post("/expenses", {
        date: form.date,
        category: form.category,
        notes: form.notes,
        amount: Number(form.amount),
      });

      showToast("Expense added successfully ✅");
      setForm({ date: "", category: "", notes: "", amount: "" });
      fetchExpenses();
    } catch (err) {
      showToast("Failed to add expense ❌");
    }
  };

  /* ===================== */
  /* PAGINATION */
  /* ===================== */
  const totalPages = Math.ceil(expenses.length / RECORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
  const paginatedExpenses = expenses.slice(
    startIndex,
    startIndex + RECORDS_PER_PAGE
  );

  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  /* ===================== */
  /* RENDER */
  /* ===================== */
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Expenses</h1>
        <p className="text-gray-500">Track and manage daily expenses</p>
      </div>

      {/* ADD EXPENSE */}
      <form
        onSubmit={handleAddExpense}
        className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-5 gap-4"
      >
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          className="border rounded-xl p-3"
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
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
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border rounded-xl p-3"
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
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

      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-3 gap-4">
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
          className="border rounded-xl p-3"
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
          className="border rounded-xl p-3"
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center font-semibold text-gray-700">
          Total:
          <span className="ml-2 text-red-600">₹{totalAmount}</span>
        </div>
      </div>

      {/* TABLE */}
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
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : paginatedExpenses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No expenses found
                  </td>
                </tr>
              ) : (
                paginatedExpenses.map((e) => (
                  <tr key={e.id}>
                    <td className="px-4 py-3">{e.date}</td>
                    <td className="px-4 py-3">{e.category}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {e.notes || "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-red-600 font-semibold">
                      ₹{e.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
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
