// /src/app/(withCommonLayout)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import AdminSideBar from "@/src/components/modules/admin/adminSidebar";
import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/ui/sidebar";
import { useState } from "react";
import SortButton from "@/src/components/ui/sortButton/SortButton";
import SideBarOptions from "@/src/components/ui/sidebar/sideBarOptions";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin";
  const [isSorted, setIsSorted] = useState(false);

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Main layout */}
      <main className="container max-w-7xl pt-16 px-3 flex-grow">
        <div className="flex h-full">
          {/* Sidebar */}

          <Sidebar />

          {/* Main Content */}
          <section
            className="flex-grow md:ml-40 rounded-lg p-2 md:p-6 mt-12 flex flex-col"
            style={{ marginTop: "4rem" }}
          >
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
