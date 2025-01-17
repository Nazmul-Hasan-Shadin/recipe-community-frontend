// /src/app/(withCommonLayout)/layout.tsx
"use client";

import { usePathname } from "next/navigation"; // Change import to next/navigation
import AdminSideBar from "@/src/components/modules/admin/adminSidebar";
import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // Check if the path starts with '/admin'

  return (
    <div className="relative flex flex-col h-screen">
      {/* Navbar */}

      {/* Main layout */}
      <main className="container max-w-7xl pt-16 px-3 flex-grow">
        <div className="flex h-full">
          <section
            className="flex-grow md:ml-40 rounded-lg p-6 mt-12"
            style={{ marginTop: "4rem" }} // Adjust margin for fixed sidebar width
          >
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
