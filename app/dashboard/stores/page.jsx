"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Shimmer, { TableRowShimmer } from "@/components/ui/shimmer";

const StoreManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setStores([
          {
            id: 1,
            name: "Store A",
            revenue: 45000,
            orders: 120,
            products: 45,
            status: "active",
          },
          // Add more sample stores
        ]);
      } catch (error) {
        console.error("Error fetching stores:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Shimmer */}
        <div className="flex justify-between items-center mb-6">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-10 w-40" />
        </div>

        {/* Table Shimmer */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="table-header">Store Name</th>
                  <th className="table-header">Revenue</th>
                  <th className="table-header">Orders</th>
                  <th className="table-header">Products</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRowShimmer key={index} cols={6} />
                  ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Store Management</h1>
        <Button>Add New Store</Button>
      </div>

      {/* Store List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="table-header">Store Name</th>
                <th className="table-header">Revenue</th>
                <th className="table-header">Orders</th>
                <th className="table-header">Products</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {stores.map((store) => (
                <tr key={store.id}>
                  <td className="table-cell">{store.name}</td>
                  <td className="table-cell">${store.revenue}</td>
                  <td className="table-cell">{store.orders}</td>
                  <td className="table-cell">{store.products}</td>
                  <td className="table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        store.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {store.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <Button variant="ghost" size="sm" className="mr-2">
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StoreManagement;
