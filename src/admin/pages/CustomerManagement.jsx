import { useEffect, useState } from "react";
import { format } from "date-fns";

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Simulate API call on mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        // Dummy API response with additional status field
        const data = {
          customers: [
            {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com",
              joinDate: new Date(2024, 0, 15),
              orders: 5,
              totalSpent: 2499.95,
              status: "Active",
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              joinDate: new Date(2023, 5, 10),
              orders: 8,
              totalSpent: 3499.5,
              status: "Inactive",
            },
            {
              id: 3,
              name: "Alice Johnson",
              email: "alice.johnson@example.com",
              joinDate: new Date(2024, 1, 20),
              orders: 12,
              totalSpent: 4999.99,
              status: "Active",
            },
          ],
        };

        // Simulate network delay
        setTimeout(() => {
          setCustomers(data.customers);
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Please try again later.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filtering and sorting logic
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter
        ? customer.status.toLowerCase() === statusFilter.toLowerCase()
        : true;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "orders") {
        return a.orders - b.orders;
      }
      if (sortBy === "spent") {
        return a.totalSpent - b.totalSpent;
      }
      if (sortBy === "date") {
        return new Date(a.joinDate) - new Date(b.joinDate);
      }
      return 0;
    });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-serif">Customer Management</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <select
            className="px-4 py-2 border rounded-md"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="orders">Orders</option>
            <option value="spent">Total Spent</option>
            <option value="date">Join Date</option>
          </select>
          <select
            className="px-4 py-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Customer Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading customers...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span>{error}</span>
        </div>
      )}

      {/* Customers Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                customer.name
                              )}&background=random`}
                              alt={customer.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(customer.joinDate, "MMM dd, yyyy")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${customer.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerManagement;
