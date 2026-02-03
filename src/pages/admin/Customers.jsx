import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { showToast } from "../../Utils/toast";

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===================== */
  /* FILTER STATE */
  /* ===================== */
  const [mobileFilter, setMobileFilter] = useState("");

  /* ===================== */
  /* PAGINATION STATE */
  /* ===================== */
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ===================== */
  /* FETCH CUSTOMERS */
  /* ===================== */
  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("admin_token");

      const res = await api.get("/admin/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          phone: mobileFilter || undefined,
          page: currentPage,
          limit: recordsPerPage,
        },
      });

      setCustomers(res.data.items);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error(err);
      showToast("Failed to load customers ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ===================== */
  /* EFFECTS */
  /* ===================== */
  useEffect(() => {
    fetchCustomers();
  }, [mobileFilter, currentPage]);

  /* ===================== */
  /* TOGGLE STATUS */
  /* ===================== */
  const toggleStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("admin_token");

      await api.patch(
        `/admin/customers/${id}/${status === "Active" ? "pause" : "resume"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast(
        status === "Active"
          ? "Subscription paused ⏸"
          : "Subscription resumed ▶️"
      );

      fetchCustomers();
    } catch (err) {
      console.error(err);
      showToast("Action failed ❌");
    }
  };

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Customers</h1>
        <p className="text-gray-500">
          View and manage subscribed customers
        </p>
      </div>

      {/* ===== MOBILE FILTER ===== */}
      <div className="bg-white rounded-2xl shadow p-4 max-w-sm">
        <input
          value={mobileFilter}
          onChange={(e) => {
            setMobileFilter(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search by Mobile Number"
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Community</th>
              <th className="px-4 py-3 text-left">Floor</th>
              <th className="px-4 py-3 text-left">Flat</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="10" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.community}</td>
                  <td className="px-4 py-3">{c.floor}</td>
                  <td className="px-4 py-3">{c.flat}</td>
                  <td className="px-4 py-3 text-gray-600">{c.address}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {c.plan}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(c.id, c.status)}
                      className={`px-4 py-2 rounded-xl text-white text-sm font-semibold ${
                        c.status === "Active"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {c.status === "Active" ? "Pause" : "Resume"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

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

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
