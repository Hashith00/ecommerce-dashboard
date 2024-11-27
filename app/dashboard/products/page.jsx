"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Shimmer, { TableRowShimmer } from "@/components/ui/shimmer";
import { useRouter } from "next/navigation";

const ProductManagement = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setProducts([
          {
            id: 1,
            name: "Product A",
            sku: "SKU001",
            price: 99.99,
            stock: 45,
            store: "Store A",
            status: "In Stock",
          },
          // Add more sample products
        ]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add categories data
  const categories = [
    {
      name: "Electronics",
      products: 45,
      value: "$12,500",
      growth: "+12.3%",
      isPositive: true,
    },
    {
      name: "Clothing",
      products: 32,
      value: "$8,900",
      growth: "+8.1%",
      isPositive: true,
    },
    {
      name: "Books",
      products: 28,
      value: "$4,200",
      growth: "-2.4%",
      isPositive: false,
    },
    // Add more categories as needed
  ];

  if (isLoading) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header Shimmer */}
        <div className="flex justify-between items-center mb-6">
          <Shimmer className="h-8 w-48" />
          <Shimmer className="h-10 w-40" />
        </div>

        {/* Filters Shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                  <th className="table-header">Product Name</th>
                  <th className="table-header">SKU</th>
                  <th className="table-header">Price</th>
                  <th className="table-header">Stock</th>
                  <th className="table-header">Store</th>
                  <th className="table-header">Status</th>
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
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">
          Product Management
        </h1>
        <Button>Add New Product</Button>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
        />
        <select className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
          <option value="">Filter by Store</option>
          <option value="store-a">Store A</option>
          <option value="store-b">Store B</option>
        </select>
        <select className="border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
          <option value="">Filter by Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Product List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="table-header">Product Name</th>
                <th className="table-header">SKU</th>
                <th className="table-header">Price</th>
                <th className="table-header">Stock</th>
                <th className="table-header">Store</th>
                <th className="table-header">Status</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="table-cell">{product.name}</td>
                  <td className="table-cell">{product.sku}</td>
                  <td className="table-cell">${product.price}</td>
                  <td className="table-cell">{product.stock}</td>
                  <td className="table-cell">{product.store}</td>
                  <td className="table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {product.status}
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

      {/* Categories Section */}
    </div>
  );
};

export default ProductManagement;
