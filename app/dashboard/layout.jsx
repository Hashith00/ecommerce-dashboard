"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Store,
  ShoppingCart,
  PieChart,
  Users,
  Megaphone,
  Menu,
  X,
  Sun,
  Moon,
  Package,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
    { name: "Categories", href: "/dashboard/categories", icon: Package },
    { name: "Stores", href: "/dashboard/stores", icon: Store },
    { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { name: "Reports", href: "/dashboard/reports", icon: PieChart },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
    { name: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-800/50 dark:bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-30 h-full
        w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
      `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-base font-bold text-gray-800 dark:text-white">
            AIXL LABS
          </h1>
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5 dark:text-gray-400" />
          </button>
        </div>

        <nav className="mt-4 h-[calc(100vh-4rem)] overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-2 my-1 mx-2 rounded-lg text-sm
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }
                `}
              >
                <item.icon className="h-4 w-4 mr-3" strokeWidth={1.5} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex text-sm">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1">
        {/* Top header */}
        <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sticky top-0 z-10">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 dark:text-gray-400" />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Main content */}
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
