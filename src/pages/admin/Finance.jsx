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

const monthlyIncome = [
  { month: "Jan", income: 45000, expense: 28000 },
  { month: "Feb", income: 52000, expense: 30000 },
  { month: "Mar", income: 61000, expense: 34000 },
  { month: "Apr", income: 68000, expense: 39000 },
  { month: "May", income: 75000, expense: 42000 },
];

const expenseData = [
  { name: "Fruits", value: 45 },
  { name: "Packaging", value: 15 },
  { name: "Delivery", value: 25 },
  { name: "Operations", value: 15 },
];

const COLORS = ["#2e7d32", "#66bb6a", "#ffa726", "#ef5350"];

export function Finance() {
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
        <StatCard title="Monthly Revenue" value="₹75,000" />
        <StatCard title="Yearly Revenue" value="₹8.2 L" />
        <StatCard title="Monthly Expenses" value="₹42,000" />
        <StatCard title="Net Profit" value="₹33,000" positive />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Income Trend */}
        <ChartCard title="Monthly Income Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyIncome}>
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

        {/* Expense Pie */}
        <ChartCard title="Expense Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {expenseData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Income vs Expense */}
        <ChartCard title="Income vs Expense">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyIncome}>
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

/* ===== Reusable Components ===== */

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
