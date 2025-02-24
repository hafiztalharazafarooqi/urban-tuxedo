import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const categoryData = [
  { name: 'Tuxedos', value: 45 },
  { name: 'Suits', value: 30 },
  { name: 'Shirts', value: 15 },
  { name: 'Accessories', value: 10 },
];

const COLORS = ['#D4AF37', '#1a1a1a', '#666666', '#999999'];

function Reports() {
  const [dateRange, setDateRange] = useState('month');

  const handleExport = () => {
    // Convert data to CSV format
    const headers = ['Month,Revenue,Orders,Average Order Value,Growth\n'];
    const rows = salesData.map(data => {
      const orders = Math.floor(data.revenue / 500);
      const avgOrderValue = 500;
      const growth = '+5.2%';
      return `${data.month},${data.revenue},${orders},${avgOrderValue},${growth}\n`;
    });

    // Combine headers and rows
    const csvContent = headers.concat(rows).join('');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_report_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif">Reports & Analytics</h1>
        <div className="flex gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
          <button 
            onClick={handleExport}
            className="btn btn-gold"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-serif mb-4">Revenue Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#D4AF37"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-serif mb-4">Sales by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly Sales Report */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-serif mb-4">Monthly Sales Report</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Order Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((month) => (
                <tr key={month.month}>
                  <td className="px-6 py-4 whitespace-nowrap">{month.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {month.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Math.floor(month.revenue / 500)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">500</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      +5.2%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;