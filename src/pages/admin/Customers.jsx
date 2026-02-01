import { useEffect, useState } from "react";

export function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Ravi Kumar",
      phone: "9876543210",
      email: "ravi@gmail.com",
      community: "Green Homes",
      floor: "3",
      flat: "A-301",
      address: "Green Homes, Madhapur, Hyderabad",
      plan: "Aarogya Classic",
      status: "Active",
    },
    {
      id: 2,
      name: "Anita Sharma",
      phone: "9123456780",
      email: "anita@gmail.com",
      community: "Sunrise Apartments",
      floor: "2",
      flat: "B-203",
      address: "Sunrise Apartments, Kondapur",
      plan: "Aarogya Lite",
      status: "Paused",
    },

    /* ===== MOCK DATA FOR PAGINATION ===== */
    ...Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      name: `Customer ${i + 3}`,
      phone: `90000000${i}`,
      email: `user${i}@test.com`,
      community: "Green Homes",
      floor: `${(i % 5) + 1}`,
      flat: `A-${100 + i}`,
      address: "Hyderabad",
      plan: "Aarogya Classic",
      status: "Active",
    })),
  ]);

  /* ===================== */
  /* FILTER STATE */
  /* ===================== */
  const [mobileFilter, setMobileFilter] = useState("");

  /* ===================== */
  /* PAGINATION STATE */
  /* ===================== */
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /* ===================== */
  /* STATUS TOGGLE */
  /* ===================== */
  const toggleStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "Active" ? "Paused" : "Active",
            }
          : c
      )
    );
  };

  /* ===================== */
  /* FILTER LOGIC */
  /* ===================== */
  const filteredCustomers = customers.filter((c) =>
    mobileFilter ? c.phone.includes(mobileFilter) : true
  );

  /* ===================== */
  /* RESET PAGE ON FILTER */
  /* ===================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [mobileFilter]);

  /* ===================== */
  /* PAGINATION LOGIC */
  /* ===================== */
  const totalPages = Math.ceil(
    filteredCustomers.length / recordsPerPage
  );

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;

  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Customers
        </h1>
        <p className="text-gray-500">
          View and manage subscribed customers
        </p>
      </div>

      {/* ===== MOBILE FILTER ===== */}
      <div className="bg-white rounded-2xl shadow p-4 max-w-sm">
        <input
          value={mobileFilter}
          onChange={(e) => setMobileFilter(e.target.value)}
          placeholder="Search by Mobile Number"
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* ===== CUSTOMER TABLE ===== */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm table-fixed">
          <colgroup>
            <col className="w-40" />
            <col className="w-32" />
            <col className="w-48" />
            <col className="w-48" />
            <col className="w-20" />
            <col className="w-28" />
            <col />
            <col className="w-40" />
            <col className="w-32" />
            <col className="w-32" />
          </colgroup>

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
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-6 text-gray-500"
                >
                  No customers found
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.community}</td>
                  <td className="px-4 py-3">{c.floor}</td>
                  <td className="px-4 py-3">{c.flat}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.address}
                  </td>
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
                      onClick={() => toggleStatus(c.id)}
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
