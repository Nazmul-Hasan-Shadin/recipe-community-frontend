'use client';

import DashboardContent from "@/src/components/modules/admin/DashboardContent";
import Header from "@/src/components/modules/admin/Header";
import RecipeTable from "@/src/components/modules/admin/RecipeTable";
import Sidebar from "@/src/components/modules/admin/adminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 overflow-y-auto">
          <DashboardContent />
          <RecipeTable />
        </main>
      </div>
    </div>
  );
}
