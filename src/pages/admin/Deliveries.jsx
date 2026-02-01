import { useEffect, useState } from "react";

export function Deliveries() {
  /* ===================== */
  /* MOCK DELIVERY DATA */
  /* ===================== */
  const [deliveries] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      phone: "9876543210",
      community: "Green Homes",
      floor: "3",
      flat: "A-301",
      address: "Green Homes, Madhapur, Hyderabad",
      plan: "Aarogya Classic",
    },
    {
      id: 2,
      name: "Anita Sharma",
      phone: "9123456780",
      community: "Sunrise Apartments",
      floor: "2",
      flat: "B-203",
      address: "Sunrise Apartments, Kondapur",
      plan: "Aarogya Lite",
    },
    {
      id: 3,
      name: "Kiran Rao",
      phone: "9000011111",
      community: "Green Homes",
      floor: "1",
      flat: "A-101",
      address: "Green Homes, Madhapur, Hyderabad",
      plan: "Children’s Pack",
    },

    /* ===== EXTRA MOCK DATA FOR PAGINATION ===== */
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 4,
      name: `Customer ${i + 4}`,
      phone: `90000000${i}`,
      community: i % 2 === 0 ? "Green Homes" : "Sunrise Apartments",
      floor: `${(i % 5) + 1}`,
      flat: `A-${200 + i}`,
      address: "Hyderabad",
      plan: i % 2 === 0 ? "Aarogya Classic" : "Aarogya Lite",
    })),
  ]);

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
  /* PAGINATION STATES */
  /* ===================== */
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      phone: "",
      community: "",
      floor: "",
      plan: "",
    });
  };

  /* ===================== */
  /* FILTER LOGIC */
  /* ===================== */
  const filteredDeliveries = deliveries.filter((d) => {
    const matchName = filters.name
      ? d.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;

    const matchPhone = filters.phone
      ? d.phone.includes(filters.phone)
      : true;

    const matchCommunity = filters.community
      ? d.community.toLowerCase().includes(filters.community.toLowerCase())
      : true;

    const matchFloor = filters.floor
      ? d.floor === filters.floor
      : true;

    const matchPlan = filters.plan
      ? d.plan === filters.plan
      : true;

    return (
      matchName &&
      matchPhone &&
      matchCommunity &&
      matchFloor &&
      matchPlan
    );
  });

  /* ===================== */
  /* RESET PAGE ON FILTER */
  /* ===================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  /* ===================== */
  /* PAGINATION LOGIC */
  /* ===================== */
  const totalPages = Math.ceil(
    filteredDeliveries.length / recordsPerPage
  );

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const paginatedDeliveries = filteredDeliveries.slice(
    startIndex,
    endIndex
  );

  const totalDeliveries = filteredDeliveries.length;

  /* ===================== */
  /* PRINT / PDF */
  /* ===================== */
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-0">

      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap justify-between items-center gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Deliveries
          </h1>
          <p className="text-gray-500">
            Filter and manage daily delivery operations
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-semibold"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* ===== FILTERS ===== */}
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
          placeholder="Phone Number"
          className="border rounded-xl p-3"
        />

        <input
          name="community"
          value={filters.community}
          onChange={handleFilterChange}
          placeholder="Community Name"
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
          className="border border-gray-300 rounded-xl p-3 font-medium hover:bg-gray-100"
        >
          Clear Filters
        </button>
      </div>

      {/* ===== TOTAL COUNT ===== */}
      <div className="font-semibold text-gray-700">
        Total Deliveries:{" "}
        <span className="text-green-700">
          {totalDeliveries}
        </span>
      </div>

      {/* ===== DELIVERY TABLE ===== */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <colgroup>
            <col className="w-40" />
            <col className="w-32" />
            <col className="w-48" />
            <col className="w-20" />
            <col className="w-28" />
            <col />
            <col className="w-40" />
          </colgroup>

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
            {paginatedDeliveries.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No deliveries found
                </td>
              </tr>
            ) : (
              paginatedDeliveries.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.phone}</td>
                  <td className="px-4 py-3">{d.community}</td>
                  <td className="px-4 py-3">{d.floor}</td>
                  <td className="px-4 py-3">{d.flat}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {d.address}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    {d.plan}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 print:hidden">
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
