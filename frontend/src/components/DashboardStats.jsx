export default function DashboardStats({ stats }) {
  const { total, pending, completed, high } = stats;

  const StatCard = ({ label, value, color }) => (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className={`text-3xl font-bold ${color} mt-2`}>{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      <StatCard label="Total Tasks" value={total} color="text-gray-800" />
      <StatCard label="Pending" value={pending} color="text-yellow-600" />
      <StatCard label="Completed" value={completed} color="text-green-600" />
      <StatCard label="High Priority" value={high} color="text-red-600" />
    </div>
  );
}
