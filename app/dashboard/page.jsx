"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  PercentIcon,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Shimmer, {
  MetricCardShimmer,
  ChartShimmer,
} from "@/components/ui/shimmer";

const DashboardOverview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Your data
        setData({
          metrics: {
            totalSales: { value: 1234, trend: 12.5, isPositive: true },
            totalRevenue: { value: 45678, trend: 8.2, isPositive: true },
            numberOfOrders: { value: 890, trend: -3.4, isPositive: false },
            averageOrderValue: { value: 123, trend: 5.7, isPositive: true },
            conversionRate: { value: 2.5, trend: 1.2, isPositive: true },
            inventoryStatus: { value: "Healthy", trend: 0, isPositive: true },
          },
          salesData: [
            { month: "Jan", sales: 4000, revenue: 6000 },
            { month: "Feb", sales: 3000, revenue: 4500 },
            { month: "Mar", sales: 2000, revenue: 3000 },
            { month: "Apr", sales: 2780, revenue: 4200 },
            { month: "May", sales: 1890, revenue: 2800 },
            { month: "Jun", sales: 2390, revenue: 3600 },
          ],
          storePerformance: [
            { name: "Store A", value: 400 },
            { name: "Store B", value: 300 },
            { name: "Store C", value: 300 },
            { name: "Store D", value: 200 },
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
          <div className="flex gap-2">
            <Shimmer className="h-10 w-32" />
            <Shimmer className="h-10 w-40" />
          </div>
        </div>

        {/* Metrics Grid Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <MetricCardShimmer key={i} />
            ))}
        </div>

        {/* Charts Shimmer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartShimmer />
          <ChartShimmer />
        </div>
      </div>
    );
  }

  const metrics = data.metrics;
  const salesData = data.salesData;
  const storePerformance = data.storePerformance;

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

  const MetricIcon = {
    totalSales: TrendingUp,
    totalRevenue: DollarSign,
    numberOfOrders: ShoppingCart,
    averageOrderValue: Package,
    conversionRate: PercentIcon,
    inventoryStatus: CheckCircle,
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-2">
        <h1 className="text-2xl font-bold dark:text-white">
          Dashboard Overview
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto">
          <select className="border rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 w-full sm:w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <Button className="rounded-lg w-full sm:w-auto">
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, data]) => {
          const Icon = MetricIcon[key];
          return (
            <MetricCard
              key={key}
              title={key.replace(/([A-Z])/g, " $1").trim()}
              value={
                typeof data.value === "number"
                  ? key.toLowerCase().includes("rate")
                    ? `${data.value}%`
                    : `$${data.value}`
                  : data.value
              }
              icon={<Icon className="h-6 w-6 dark:text-gray-300" />}
              trend={data.trend}
              isPositive={data.isPositive}
            />
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales & Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales & Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} />
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
                    dataKey="sales"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Store Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Store Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storePerformance}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {storePerformance.map((entry, index) => (
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
    </div>
  );
};

// Enhanced Metric Card Component
const MetricCard = ({ title, value, icon, trend, isPositive }) => (
  <Card className="hover:shadow-md transition-shadow dark:bg-gray-800">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-2 dark:text-white">{value}</h3>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-900/50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
            vs last period
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default DashboardOverview;
