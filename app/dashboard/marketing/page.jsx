"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Shimmer, { TableRowShimmer } from "@/components/ui/shimmer";

const MarketingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignPerformance, setCampaignPerformance] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCampaigns([
          {
            id: 1,
            name: "Summer Sale",
            status: "active",
            budget: 5000,
            spent: 2500,
            conversions: 150,
            revenue: 12500,
          },
          // Add more campaigns
        ]);
        setCampaignPerformance([
          { name: "Week 1", clicks: 400, conversions: 40, revenue: 4000 },
          { name: "Week 2", clicks: 300, conversions: 35, revenue: 3500 },
          { name: "Week 3", clicks: 500, conversions: 55, revenue: 5500 },
          { name: "Week 4", clicks: 450, conversions: 50, revenue: 5000 },
        ]);
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

        {/* Summary Cards Shimmer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="dark:bg-gray-800">
                <CardContent className="p-4 lg:p-6">
                  <Shimmer className="h-4 w-24 mb-2" />
                  <Shimmer className="h-8 w-32 mb-2" />
                  <Shimmer className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Table Shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRowShimmer key={i} cols={7} />
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Chart Shimmer */}
        <Card>
          <CardHeader>
            <Shimmer className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold dark:text-white">
          Marketing & Promotions
        </h1>
        <Button className="w-full sm:w-auto">Create Campaign</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 lg:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Active Campaigns
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">12</p>
            <span className="text-green-500 text-sm">4 launching soon</span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 lg:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Budget
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">$25,000</p>
            <span className="text-green-500 text-sm">$15,000 remaining</span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 lg:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Conversions
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">1,234</p>
            <span className="text-green-500 text-sm">
              +12.3% from last month
            </span>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-4 lg:p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ROI
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">245%</p>
            <span className="text-green-500 text-sm">+25% from last month</span>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="table-header">Campaign</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Budget</th>
                    <th className="table-header">Spent</th>
                    <th className="table-header">Conversions</th>
                    <th className="table-header">Revenue</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="table-cell">{campaign.name}</td>
                      <td className="table-cell">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          {campaign.status}
                        </span>
                      </td>
                      <td className="table-cell">${campaign.budget}</td>
                      <td className="table-cell">${campaign.spent}</td>
                      <td className="table-cell">{campaign.conversions}</td>
                      <td className="table-cell">${campaign.revenue}</td>
                      <td className="table-cell">
                        <Button variant="ghost" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          Stop
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={campaignPerformance}>
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
                  dataKey="clicks"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10B981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPage;
