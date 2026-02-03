import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { showToast } from "../../Utils/toast";

export function Deliveries() {
  /* ===================== */
  /* DATA STATE */
  /* ===================== */
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===================== */
  /* FILTER STATES */
  /* ===================== */
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    community: "",
    floor: "",
    plan: "",
  });

  /* ===================== */
  /* PAGINATION */
  /* ===================== */
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* ===================== */
  /* FETCH DELIVERIES */
  /* ===================== */
  const fetchDeliveries = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/deliveries", {
        params: {
          ...filters,
          page: currentPage,
          limit: recordsPerPage,
        },
      });

      setDeliveries(res.data.items);
    } catch (err) {
      showToast("Failed to load deliveries ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [filters, currentPage]);

  /* ===================== */
  /* HANDLERS */
  /* ===================== */
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      phone: "",
      community: "",
      floor: "",
      plan: "",
    });
    setCurrentPage(1);
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 print:p-0">

      {/* HEADER */}
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Deliveries</h1>
          <p className="text-gray-500">
            Daily delivery operations overview
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-semibold"
        >
          Print / PDF
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-6 gap-4 print:hidden">
        <input
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          placeholder="Customer Name"
          className="border rounded-xl p-3"
        />

        <input
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          placeholder="Phone"
          className="border rounded-xl p-3"
        />

        <input
          name="community"
          value={filters.community}
          onChange={handleFilterChange}
          placeholder="Community"
          className="border rounded-xl p-3"
        />

        <input
          name="floor"
          value={filters.floor}
          onChange={handleFilterChange}
          placeholder="Floor"
          className="border rounded-xl p-3"
        />

        <select
          name="plan"
          value={filters.plan}
          onChange={handleFilterChange}
          className="border rounded-xl p-3"
        >
          <option value="">All Plans</option>
          <option>Aarogya Lite</option>
          <option>Aarogya Classic</option>
          <option>Aarogya Premium</option>
          <option>Children’s Pack</option>
        </select>

        <button
          onClick={clearFilters}
          className="border rounded-xl p-3 hover:bg-gray-100"
        >
          Clear
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Community</th>
              <th className="px-4 py-3 text-left">Floor</th>
              <th className="px-4 py-3 text-left">Flat</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Plan</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : deliveries.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No deliveries found
                </td>
              </tr>
            ) : (
              deliveries.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.phone}</td>
                  <td className="px-4 py-3">{d.community}</td>
                  <td className="px-4 py-3">{d.floor}</td>
                  <td className="px-4 py-3">{d.flat}</td>
                  <td className="px-4 py-3">{d.address}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {d.plan}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
