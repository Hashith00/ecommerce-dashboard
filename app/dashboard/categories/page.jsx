"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Shimmer, { TableRowShimmer } from "@/components/ui/shimmer";
import { Plus, Edit, Trash2, ArrowUpRight, ArrowDownRight } from "lucide-react";

const CategoriesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setCategories([
          {
            id: 1,
            name: "Electronics",
            description: "Electronic devices and accessories",
            products: 45,
            value: 12500,
            growth: 12.3,
            isPositive: true,
            status: "active",
          },
          // Add more categories
        ]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Shimmer */}
        <div className="flex justify-between items-center mb-6">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-10 w-40" />
        </div>

        {/* Summary Cards Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Shimmer key={i} className="h-24 rounded-lg" />
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
                      <TableRowShimmer key={i} cols={6} />
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Category Management
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Categories
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">12</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Products
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">256</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Average Products/Category
            </h3>
            <p className="text-2xl font-bold mt-2 dark:text-white">21</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="table-header">Category Name</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Products</th>
                  <th className="table-header">Value</th>
                  <th className="table-header">Growth</th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="table-cell font-medium">{category.name}</td>
                    <td className="table-cell">{category.description}</td>
                    <td className="table-cell">{category.products}</td>
                    <td className="table-cell">
                      ${category.value.toLocaleString()}
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center">
                        {category.isPositive ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span
                          className={
                            category.isPositive
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {Math.abs(category.growth)}%
                        </span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
