"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Shimmer, {
  MetricCardShimmer,
  TableRowShimmer,
  ChartShimmer,
} from "@/components/ui/shimmer";

const CustomersPage = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData({
          customers: [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              orders: 15,
              totalSpent: 1250,
              lastPurchase: "2024-02-20",
              status: "active",
            },
            // Add more customer data
          ],
          customerSegments: [
            { name: "New", value: 300 },
            { name: "Regular", value: 500 },
            { name: "VIP", value: 200 },
            { name: "Inactive", value: 100 },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Shimmer */}
        <div className="flex justify-between items-center">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-10 w-40" />
        </div>

        {/* Metrics Grid Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <MetricCardShimmer key={i} />
            ))}
        </div>

        {/* Table Shimmer */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <Shimmer className="h-6 w-40" />
          </div>
          <div className="p-4">
            <table className="w-full">
              <tbody>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <TableRowShimmer key={i} cols={6} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Shimmer */}
        <ChartShimmer />
      </div>
    );
  }

  // Rest of your component with actual data
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-white">
          Customer Insights
        </h1>
        <Button className="w-full sm:w-auto">Export Customer Data</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Customers
            </h3>
            <div className="mt-2 flex flex-row sm:flex-col justify-between sm:justify-start items-baseline sm:items-start">
              <p className="text-2xl font-bold dark:text-white">1,234</p>
              <span className="text-green-500 text-sm">
                +5.2% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Customers
            </h3>
            <div className="mt-2 flex flex-row sm:flex-col justify-between sm:justify-start items-baseline sm:items-start">
              <p className="text-2xl font-bold dark:text-white">892</p>
              <span className="text-green-500 text-sm">72% of total</span>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Lifetime Value
            </h3>
            <div className="mt-2 flex flex-row sm:flex-col justify-between sm:justify-start items-baseline sm:items-start">
              <p className="text-2xl font-bold dark:text-white">$856</p>
              <span className="text-green-500 text-sm">
                +12.3% from last month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Churn Rate
            </h3>
            <div className="mt-2 flex flex-row sm:flex-col justify-between sm:justify-start items-baseline sm:items-start">
              <p className="text-2xl font-bold dark:text-white">2.4%</p>
              <span className="text-red-500 text-sm">
                +0.8% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recent Customers</CardTitle>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="table-header">Customer</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Orders</th>
                    <th className="table-header">Total Spent</th>
                    <th className="table-header">Last Purchase</th>
                    <th className="table-header">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data.customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="table-cell">{customer.name}</td>
                      <td className="table-cell">{customer.email}</td>
                      <td className="table-cell">{customer.orders}</td>
                      <td className="table-cell">${customer.totalSpent}</td>
                      <td className="table-cell">{customer.lastPurchase}</td>
                      <td className="table-cell">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="h-[250px] sm:h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius="80%"
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {data.customerSegments.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
