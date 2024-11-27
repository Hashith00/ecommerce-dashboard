"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Shimmer, { TableRowShimmer } from "@/components/ui/shimmer";

const OrderManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setOrders([
          {
            id: "#ORD001",
            customer: "John Doe",
            date: "2024-02-20",
            total: 299.99,
            status: "Processing",
            store: "Store A",
          },
          // Add more sample orders
        ]);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Shimmer */}
        <Shimmer className="h-8 w-48" />

        {/* Filters Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
          <Shimmer className="h-10 w-full" />
        </div>

        {/* Table Shimmer */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="table-header">Order ID</th>
                  <th className="table-header">Customer</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Total</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Store</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRowShimmer key={index} cols={7} />
                  ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination Shimmer */}
        <div className="flex justify-between items-center">
          <Shimmer className="h-8 w-24" />
          <div className="flex gap-2">
            <Shimmer className="h-8 w-8" />
            <Shimmer className="h-8 w-8" />
            <Shimmer className="h-8 w-8" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">
        Order Management
      </h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        />
        <select className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white">
          <option value="">Order Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>

        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-white dark:bg-gray-800 border border-input",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <select className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white">
          <option value="">Store</option>
          <option value="store-a">Store A</option>
          <option value="store-b">Store B</option>
        </select>
      </div>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="table-header">Order ID</th>
                <th className="table-header">Customer</th>
                <th className="table-header">Date</th>
                <th className="table-header">Total</th>
                <th className="table-header">Status</th>
                <th className="table-header">Store</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="table-cell">{order.id}</td>
                  <td className="table-cell">{order.customer}</td>
                  <td className="table-cell">{order.date}</td>
                  <td className="table-cell">${order.total}</td>
                  <td className="table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="table-cell">{order.store}</td>
                  <td className="table-cell">
                    <Button variant="ghost" size="sm" className="mr-2">
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Print
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

export default OrderManagement;
