"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState("monthly");
  const [reportType, setReportType] = useState("revenue");

  const revenueData = [
    { name: "Jan", revenue: 4000, expenses: 2400, profit: 1600 },
    { name: "Feb", revenue: 3000, expenses: 1398, profit: 1602 },
    { name: "Mar", revenue: 2000, expenses: 9800, profit: 2200 },
    { name: "Apr", revenue: 2780, expenses: 3908, profit: 2000 },
    { name: "May", revenue: 1890, expenses: 4800, profit: 1500 },
    { name: "Jun", revenue: 2390, expenses: 3800, profit: 1700 },
  ];

  const salesByCategory = [
    { category: "Electronics", sales: 4000 },
    { category: "Clothing", sales: 3000 },
    { category: "Books", sales: 2000 },
    { category: "Home", sales: 2780 },
    { category: "Sports", sales: 1890 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-white">
          Financial Reports
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto">
          <select
            className="border rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="weekly">Last 7 days</option>
            <option value="monthly">Last 30 days</option>
            <option value="yearly">Last 12 months</option>
          </select>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Revenue
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">$24,567</p>
            <span className="text-green-500 text-sm">
              +12.5% from last period
            </span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Expenses
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">$12,345</p>
            <span className="text-red-500 text-sm">+8.2% from last period</span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Net Profit
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">$12,222</p>
            <span className="text-green-500 text-sm">
              +15.3% from last period
            </span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Profit Margin
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">49.8%</p>
            <span className="text-green-500 text-sm">
              +2.1% from last period
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" stroke="#888888" fontSize={12} />
                  <YAxis stroke="#888888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="sales" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
