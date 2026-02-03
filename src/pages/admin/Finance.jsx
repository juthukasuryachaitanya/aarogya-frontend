import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { api } from "../../services/api";
import { showToast } from "../../Utils/toast";

const COLORS = ["#2e7d32", "#66bb6a", "#ffa726", "#ef5350"];

export function Finance() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    monthlyExpense: 0,
    profit: 0,
  });

  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/finance/summary");

      setStats(res.data.stats);
      setMonthlyTrend(res.data.monthlyTrend);
      setExpenseBreakdown(res.data.expenseBreakdown);

    } catch (err) {
      showToast("Failed to load finance data 📉");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading financial data...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Financial Overview
        </h1>
        <p className="text-gray-500">
          Track income, expenses, and business health
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue}`} />
        <StatCard title="Yearly Revenue" value={`₹${stats.yearlyRevenue}`} />
        <StatCard title="Monthly Expenses" value={`₹${stats.monthlyExpense}`} />
        <StatCard
          title="Net Profit"
          value={`₹${stats.profit}`}
          positive={stats.profit > 0}
        />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Monthly Income Trend */}
        <ChartCard title="Monthly Income Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#2e7d32"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Expense Breakdown */}
        <ChartCard title="Expense Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {expenseBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Income vs Expense */}
        <ChartCard title="Income vs Expense">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#2e7d32" />
              <Bar dataKey="expense" fill="#ef5350" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

/* ===================== */
/* REUSABLE COMPONENTS */
/* ===================== */

function StatCard({ title, value, positive }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p
        className={`text-2xl font-extrabold mt-2 ${
          positive ? "text-green-700" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
